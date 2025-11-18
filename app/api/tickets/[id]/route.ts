import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { id } = await params;
    const result = await query(
      `SELECT t.*, 
        u1.name as creator_name, u1.email as creator_email,
        u2.name as assigned_name, u2.email as assigned_email,
        u3.name as closer_name
      FROM lvm_tickets t
      LEFT JOIN lvm_users u1 ON t.created_by = u1.id
      LEFT JOIN lvm_users u2 ON t.assigned_to = u2.id
      LEFT JOIN lvm_users u3 ON t.closed_by = u3.id
      WHERE t.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 });
    }

    const historyResult = await query(
      `SELECT h.*, u.name as changed_by_name
       FROM lvm_ticket_history h
       LEFT JOIN lvm_users u ON h.changed_by = u.id
       WHERE h.ticket_id = $1
       ORDER BY h.created_at DESC`,
      [id]
    );

    return NextResponse.json({
      ticket: result.rows[0],
      history: historyResult.rows,
    });
  } catch (error) {
    console.error('[v0] Error fetching ticket:', error);
    return NextResponse.json({ error: 'Error al obtener ticket' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    if (user.role !== 'administrador' && user.role !== 'ingeniero') {
      return NextResponse.json({ error: 'Sin permisos' }, { status: 403 });
    }

    const { id } = await params;
    const updates = await request.json();

    const allowedFields = ['title', 'description', 'priority', 'status', 'resolution', 'assigned_to'];
    const fields = Object.keys(updates).filter(key => allowedFields.includes(key));

    if (fields.length === 0) {
      return NextResponse.json({ error: 'No hay campos para actualizar' }, { status: 400 });
    }

    const setClauses = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const values = fields.map(field => updates[field]);

    // If closing ticket, add closed_at and closed_by
    if (updates.status === 'cerrado') {
      const result = await query(
        `UPDATE lvm_tickets SET ${setClauses}, closed_at = NOW(), closed_by = $${fields.length + 2}, updated_at = NOW()
         WHERE id = $1 RETURNING *`,
        [id, ...values, user.id]
      );

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 });
      }

      await query(
        'INSERT INTO lvm_ticket_history (ticket_id, action, changed_by, new_value) VALUES ($1, $2, $3, $4)',
        [id, 'closed', user.id, JSON.stringify({ closed_by: user.name })]
      );

      return NextResponse.json({ ticket: result.rows[0] });
    }

    const result = await query(
      `UPDATE lvm_tickets SET ${setClauses}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...values]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 });
    }

    await query(
      'INSERT INTO lvm_ticket_history (ticket_id, action, changed_by, new_value) VALUES ($1, $2, $3, $4)',
      [id, 'updated', user.id, JSON.stringify(updates)]
    );

    return NextResponse.json({ ticket: result.rows[0] });
  } catch (error) {
    console.error('[v0] Error updating ticket:', error);
    return NextResponse.json({ error: 'Error al actualizar ticket' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    if (user.role !== 'administrador') {
      return NextResponse.json({ error: 'Solo administradores pueden eliminar' }, { status: 403 });
    }

    const { id } = await params;

    await query('DELETE FROM lvm_ticket_history WHERE ticket_id = $1', [id]);
    
    const result = await query('DELETE FROM lvm_tickets WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Error deleting ticket:', error);
    return NextResponse.json({ error: 'Error al eliminar ticket' }, { status: 500 });
  }
}
