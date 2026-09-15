'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSessionCookieValue, SESSION_COOKIE_NAME, verifyAdminPassword } from '@/lib/admin-session';

export async function login(formData: FormData) {
  const password = String(formData.get('password') ?? '');

  if (!verifyAdminPassword(password)) {
    redirect('/admin/login?error=1');
  }

  const session = await createSessionCookieValue();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: session.maxAge,
  });

  redirect('/admin');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: SESSION_COOKIE_NAME, path: '/admin' });
  redirect('/admin/login');
}
