import { compare, hash } from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET || 'default-secret-change-this');

export interface User {
  id: number;
  cedula: string;
  name: string;
  role: 'administrador' | 'analista' | 'ingeniero';
  email: string;
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function createSession(user: User) {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  (await cookies()).set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session');

  if (!token) return null;

  try {
    const verified = await jwtVerify(token.value, secret);
    return verified.payload.user as User;
  } catch (error) {
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete('session');
}
