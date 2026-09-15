'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import type { ProjectStatus } from '@/generated/prisma/client';

const STATUS_VALUES: ProjectStatus[] = ['DEPLOYED', 'PUBLISHED', 'COMING_SOON'];

function readCategoryFields(formData: FormData) {
  return {
    categoryTitle: String(formData.get('categoryTitle') ?? ''),
    showGithubButton: formData.get('showGithubButton') === 'on',
    showMediumButton: formData.get('showMediumButton') === 'on',
    mediumLink: String(formData.get('mediumLink') ?? '') || null,
  };
}

function readProjectFields(formData: FormData) {
  const status = String(formData.get('status') ?? '');
  if (!STATUS_VALUES.includes(status as ProjectStatus)) {
    throw new Error(`Invalid status: ${status}`);
  }
  return {
    title: String(formData.get('title') ?? ''),
    description: String(formData.get('description') ?? ''),
    link: String(formData.get('link') ?? '') || null,
    repo: String(formData.get('repo') ?? '') || null,
    status: status as ProjectStatus,
    tags: String(formData.get('tags') ?? '')
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean),
    imagePlaceholder: String(formData.get('imagePlaceholder') ?? ''),
    imageAiHint: String(formData.get('imageAiHint') ?? ''),
  };
}

// --- Category ---------------------------------------------------------

export async function createProjectCategory(formData: FormData) {
  const fields = readCategoryFields(formData);
  const count = await prisma.projectCategory.count();
  const category = await prisma.projectCategory.create({ data: { ...fields, order: count } });

  revalidatePath('/');
  revalidatePath('/admin/project-categories');
  redirect(`/admin/project-categories/${category.id}/edit`);
}

export async function updateProjectCategory(id: number, formData: FormData) {
  const fields = readCategoryFields(formData);
  await prisma.projectCategory.update({ where: { id }, data: fields });

  revalidatePath('/');
  revalidatePath('/admin/project-categories');
}

export async function deleteProjectCategory(id: number) {
  await prisma.projectCategory.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/project-categories');
}

export async function moveProjectCategory(id: number, direction: 'up' | 'down') {
  const item = await prisma.projectCategory.findUniqueOrThrow({ where: { id } });
  const neighbor = await prisma.projectCategory.findFirst({
    where: { order: direction === 'up' ? { lt: item.order } : { gt: item.order } },
    orderBy: { order: direction === 'up' ? 'desc' : 'asc' },
  });
  if (!neighbor) return;

  await prisma.$transaction([
    prisma.projectCategory.update({ where: { id: item.id }, data: { order: neighbor.order } }),
    prisma.projectCategory.update({ where: { id: neighbor.id }, data: { order: item.order } }),
  ]);

  revalidatePath('/');
  revalidatePath('/admin/project-categories');
}

// --- Nested project -------------------------------------------------------

export async function createProject(categoryId: number, formData: FormData) {
  const fields = readProjectFields(formData);
  const count = await prisma.project.count({ where: { categoryId } });
  await prisma.project.create({ data: { ...fields, categoryId, order: count } });

  revalidatePath('/');
  revalidatePath(`/admin/project-categories/${categoryId}/edit`);
  redirect(`/admin/project-categories/${categoryId}/edit`);
}

export async function updateProject(categoryId: number, id: number, formData: FormData) {
  const fields = readProjectFields(formData);
  await prisma.project.update({ where: { id }, data: fields });

  revalidatePath('/');
  revalidatePath(`/admin/project-categories/${categoryId}/edit`);
  redirect(`/admin/project-categories/${categoryId}/edit`);
}

export async function deleteProject(categoryId: number, id: number) {
  await prisma.project.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath(`/admin/project-categories/${categoryId}/edit`);
}

export async function moveProject(categoryId: number, id: number, direction: 'up' | 'down') {
  const item = await prisma.project.findUniqueOrThrow({ where: { id } });
  const neighbor = await prisma.project.findFirst({
    where: {
      categoryId,
      order: direction === 'up' ? { lt: item.order } : { gt: item.order },
    },
    orderBy: { order: direction === 'up' ? 'desc' : 'asc' },
  });
  if (!neighbor) return;

  await prisma.$transaction([
    prisma.project.update({ where: { id: item.id }, data: { order: neighbor.order } }),
    prisma.project.update({ where: { id: neighbor.id }, data: { order: item.order } }),
  ]);

  revalidatePath('/');
  revalidatePath(`/admin/project-categories/${categoryId}/edit`);
}
