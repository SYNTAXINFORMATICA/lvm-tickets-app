import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const result = await query(
      `SELECT area, COUNT(*) as ticket_count
       FROM lvm_tickets
       GROUP BY area
       ORDER BY ticket_count DESC`,
      []
    );

    return NextResponse.json({ data: result.rows });
  } catch (error) {
    console.error('[v0] Error fetching report:', error);
    return NextResponse.json({ error: 'Error al generar reporte' }, { status: 500 });
  }
}
