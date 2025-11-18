import { LoginForm } from '@/components/login-form';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const user = await getSession();
  
  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,transparent,black)]" />
      <div className="relative">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            DoctuxDB Support
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Sistema de Soporte Técnico con IA
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
