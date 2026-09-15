'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

function parseNavItems(raw: string): { label: string; href: string }[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split('|').map((s) => s.trim());
      return { label: label ?? '', href: href ?? '' };
    });
}

export async function updateHeader(formData: FormData) {
  const data = {
    logoText: String(formData.get('logoText') ?? ''),
    siteTitle: String(formData.get('siteTitle') ?? ''),
    navItems: parseNavItems(String(formData.get('navItems') ?? '')),
  };

  await prisma.headerConfig.upsert({
    where: { id: 1 },
    create: { id: 1, ...data },
    update: data,
  });

  revalidatePath('/');
  revalidatePath('/admin/header');
}
