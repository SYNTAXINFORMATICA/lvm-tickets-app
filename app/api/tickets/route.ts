import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { analyzeTicket } from '@/lib/azure-openai';

export async function GET(request: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const application = searchParams.get('application');

    let sql = `
      SELECT t.*, 
        u1.name as creator_name, 
        u2.name as assigned_name,
        u3.name as closer_name
      FROM lvm_tickets t
      LEFT JOIN lvm_users u1 ON t.created_by = u1.id
      LEFT JOIN lvm_users u2 ON t.assigned_to = u2.id
      LEFT JOIN lvm_users u3 ON t.closed_by = u3.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      sql += ` AND t.status = $${paramCount}`;
      params.push(status);
    }

    if (priority) {
      paramCount++;
      sql += ` AND t.priority = $${paramCount}`;
      params.push(priority);
    }

    if (application) {
      paramCount++;
      sql += ` AND t.application = $${paramCount}`;
      params.push(application);
    }

    sql += ' ORDER BY t.created_at DESC';

    const result = await query(sql, params);
    return NextResponse.json({ tickets: result.rows });
  } catch (error) {
    console.error('[v0] Error fetching tickets:', error);
    return NextResponse.json({ error: 'Error al obtener tickets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { title, description, application, area } = await request.json();

    if (!title || !description || !application || !area) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Analyze ticket with AI
    const aiAnalysis = await analyzeTicket(title, description, application);

    const result = await query(
      `INSERT INTO lvm_tickets (
        title, description, application, area, priority, status, 
        support_level, created_by, resolution, ai_analysis
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *`,
      [
        title,
        description,
        application,
        area,
        aiAnalysis.priority,
        aiAnalysis.can_resolve ? 'cerrado' : 'abierto',
        aiAnalysis.support_level,
        user.id,
        aiAnalysis.resolution,
        aiAnalysis.analysis,
      ]
    );

    const ticket = result.rows[0];

    // If AI resolved it, mark it as closed
    if (aiAnalysis.can_resolve) {
      await query(
        'UPDATE lvm_tickets SET closed_at = NOW(), closed_by = $1 WHERE id = $2',
        [user.id, ticket.id]
      );
    }

    await query(
      'INSERT INTO lvm_ticket_history (ticket_id, action, changed_by, new_value) VALUES ($1, $2, $3, $4)',
      [ticket.id, 'created', user.id, JSON.stringify(aiAnalysis)]
    );

    return NextResponse.json({ ticket, aiAnalysis });
  } catch (error) {
    console.error('[v0] Error creating ticket:', error);
    return NextResponse.json({ error: 'Error al crear ticket' }, { status: 500 });
  }
}
