'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { EXPERIENCE_ICON_NAMES } from '@/lib/icon-options';

function readFields(formData: FormData) {
  const iconName = String(formData.get('iconName') ?? '');
  if (!EXPERIENCE_ICON_NAMES.includes(iconName as (typeof EXPERIENCE_ICON_NAMES)[number])) {
    throw new Error(`Invalid iconName: ${iconName}`);
  }
  return {
    role: String(formData.get('role') ?? ''),
    company: String(formData.get('company') ?? ''),
    period: String(formData.get('period') ?? ''),
    description: String(formData.get('description') ?? ''),
    iconName,
    highlights: String(formData.get('highlights') ?? '')
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean),
  };
}

export async function createExperience(formData: FormData) {
  const fields = readFields(formData);
  const count = await prisma.experience.count();
  await prisma.experience.create({ data: { ...fields, order: count } });

  revalidatePath('/');
  revalidatePath('/admin/experience');
  redirect('/admin/experience');
}

export async function updateExperience(id: number, formData: FormData) {
  const fields = readFields(formData);
  await prisma.experience.update({ where: { id }, data: fields });

  revalidatePath('/');
  revalidatePath('/admin/experience');
  redirect('/admin/experience');
}

export async function deleteExperience(id: number) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/experience');
}

export async function moveExperience(id: number, direction: 'up' | 'down') {
  const item = await prisma.experience.findUniqueOrThrow({ where: { id } });
  const neighbor = await prisma.experience.findFirst({
    where: { order: direction === 'up' ? { lt: item.order } : { gt: item.order } },
    orderBy: { order: direction === 'up' ? 'desc' : 'asc' },
  });
  if (!neighbor) return;

  await prisma.$transaction([
    prisma.experience.update({ where: { id: item.id }, data: { order: neighbor.order } }),
    prisma.experience.update({ where: { id: neighbor.id }, data: { order: item.order } }),
  ]);

  revalidatePath('/');
  revalidatePath('/admin/experience');
}
