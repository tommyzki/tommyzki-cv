'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

export async function updateAbout(formData: FormData) {
  const data = {
    title: String(formData.get('title') ?? ''),
    paragraphs: String(formData.get('paragraphs') ?? '')
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean),
  };

  await prisma.about.upsert({
    where: { id: 1 },
    create: { id: 1, ...data },
    update: data,
  });

  revalidatePath('/');
  revalidatePath('/admin/about');
}
