'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { SKILL_CATEGORY_ICON_NAMES, SKILL_ICON_NAMES } from '@/lib/icon-options';

function requireIcon(value: string, allowed: readonly string[]) {
  if (!allowed.includes(value)) throw new Error(`Invalid iconName: ${value}`);
  return value;
}

// --- Category ---------------------------------------------------------

export async function createSkillCategory(formData: FormData) {
  const title = String(formData.get('title') ?? '');
  const categoryIconName = requireIcon(String(formData.get('categoryIconName') ?? ''), SKILL_CATEGORY_ICON_NAMES);
  const count = await prisma.skillCategory.count();
  const category = await prisma.skillCategory.create({ data: { title, categoryIconName, order: count } });

  revalidatePath('/');
  revalidatePath('/admin/skill-categories');
  redirect(`/admin/skill-categories/${category.id}/edit`);
}

export async function updateSkillCategory(id: number, formData: FormData) {
  const title = String(formData.get('title') ?? '');
  const categoryIconName = requireIcon(String(formData.get('categoryIconName') ?? ''), SKILL_CATEGORY_ICON_NAMES);
  await prisma.skillCategory.update({ where: { id }, data: { title, categoryIconName } });

  revalidatePath('/');
  revalidatePath('/admin/skill-categories');
}

export async function deleteSkillCategory(id: number) {
  await prisma.skillCategory.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/skill-categories');
}

export async function moveSkillCategory(id: number, direction: 'up' | 'down') {
  const item = await prisma.skillCategory.findUniqueOrThrow({ where: { id } });
  const neighbor = await prisma.skillCategory.findFirst({
    where: { order: direction === 'up' ? { lt: item.order } : { gt: item.order } },
    orderBy: { order: direction === 'up' ? 'desc' : 'asc' },
  });
  if (!neighbor) return;

  await prisma.$transaction([
    prisma.skillCategory.update({ where: { id: item.id }, data: { order: neighbor.order } }),
    prisma.skillCategory.update({ where: { id: neighbor.id }, data: { order: item.order } }),
  ]);

  revalidatePath('/');
  revalidatePath('/admin/skill-categories');
}

// --- Nested skill -------------------------------------------------------

export async function createSkill(categoryId: number, formData: FormData) {
  const name = String(formData.get('name') ?? '');
  const iconName = requireIcon(String(formData.get('iconName') ?? ''), SKILL_ICON_NAMES);
  const count = await prisma.skill.count({ where: { categoryId } });
  await prisma.skill.create({ data: { name, iconName, categoryId, order: count } });

  revalidatePath('/');
  revalidatePath(`/admin/skill-categories/${categoryId}/edit`);
}

export async function updateSkill(id: number, formData: FormData) {
  const name = String(formData.get('name') ?? '');
  const iconName = requireIcon(String(formData.get('iconName') ?? ''), SKILL_ICON_NAMES);
  const skill = await prisma.skill.update({ where: { id }, data: { name, iconName } });

  revalidatePath('/');
  revalidatePath(`/admin/skill-categories/${skill.categoryId}/edit`);
}

export async function deleteSkill(id: number) {
  const skill = await prisma.skill.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath(`/admin/skill-categories/${skill.categoryId}/edit`);
}

export async function moveSkill(id: number, direction: 'up' | 'down') {
  const item = await prisma.skill.findUniqueOrThrow({ where: { id } });
  const neighbor = await prisma.skill.findFirst({
    where: {
      categoryId: item.categoryId,
      order: direction === 'up' ? { lt: item.order } : { gt: item.order },
    },
    orderBy: { order: direction === 'up' ? 'desc' : 'asc' },
  });
  if (!neighbor) return;

  await prisma.$transaction([
    prisma.skill.update({ where: { id: item.id }, data: { order: neighbor.order } }),
    prisma.skill.update({ where: { id: neighbor.id }, data: { order: item.order } }),
  ]);

  revalidatePath('/');
  revalidatePath(`/admin/skill-categories/${item.categoryId}/edit`);
}
