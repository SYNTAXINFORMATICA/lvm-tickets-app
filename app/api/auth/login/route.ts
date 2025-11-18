import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyPassword, createSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { cedula, password } = await request.json();

    if (!cedula || !password) {
      return NextResponse.json(
        { error: 'Cédula y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Find user by cedula
    const result = await query(
      'SELECT id, cedula, password, name, role, email FROM lvm_users WHERE cedula = $1',
      [cedula]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Special case for admin user with plain password (for demo purposes)
    const isValidPassword = user.cedula === 'admin' && password === 'admin2025*'
      ? true
      : await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Create session
    await createSession({
      id: user.id,
      cedula: user.cedula,
      name: user.name,
      role: user.role,
      email: user.email,
    });

    return NextResponse.json({
      user: {
        id: user.id,
        cedula: user.cedula,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('[v0] Login error:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
