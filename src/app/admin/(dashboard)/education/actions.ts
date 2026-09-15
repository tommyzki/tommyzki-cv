'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { EDUCATION_ICON_NAMES } from '@/lib/icon-options';

function readFields(formData: FormData) {
  const iconName = String(formData.get('iconName') ?? '');
  if (!EDUCATION_ICON_NAMES.includes(iconName as (typeof EDUCATION_ICON_NAMES)[number])) {
    throw new Error(`Invalid iconName: ${iconName}`);
  }
  return {
    institution: String(formData.get('institution') ?? ''),
    period: String(formData.get('period') ?? ''),
    title: String(formData.get('title') ?? ''),
    description: String(formData.get('description') ?? ''),
    iconName,
    details: String(formData.get('details') ?? '')
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean),
  };
}

export async function createEducation(formData: FormData) {
  const fields = readFields(formData);
  const count = await prisma.education.count();
  await prisma.education.create({ data: { ...fields, order: count } });

  revalidatePath('/');
  revalidatePath('/admin/education');
  redirect('/admin/education');
}

export async function updateEducation(id: number, formData: FormData) {
  const fields = readFields(formData);
  await prisma.education.update({ where: { id }, data: fields });

  revalidatePath('/');
  revalidatePath('/admin/education');
  redirect('/admin/education');
}

export async function deleteEducation(id: number) {
  await prisma.education.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/education');
}

export async function moveEducation(id: number, direction: 'up' | 'down') {
  const item = await prisma.education.findUniqueOrThrow({ where: { id } });
  const neighbor = await prisma.education.findFirst({
    where: { order: direction === 'up' ? { lt: item.order } : { gt: item.order } },
    orderBy: { order: direction === 'up' ? 'desc' : 'asc' },
  });
  if (!neighbor) return;

  await prisma.$transaction([
    prisma.education.update({ where: { id: item.id }, data: { order: neighbor.order } }),
    prisma.education.update({ where: { id: neighbor.id }, data: { order: item.order } }),
  ]);

  revalidatePath('/');
  revalidatePath('/admin/education');
}
