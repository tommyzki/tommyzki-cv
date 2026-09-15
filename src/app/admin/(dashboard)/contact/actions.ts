'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { CONTACT_ICON_NAMES } from '@/lib/icon-options';
import type { ContactGroup } from '@/generated/prisma/client';

function readFields(formData: FormData) {
  const iconName = String(formData.get('iconName') ?? '');
  if (!CONTACT_ICON_NAMES.includes(iconName as (typeof CONTACT_ICON_NAMES)[number])) {
    throw new Error(`Invalid iconName: ${iconName}`);
  }
  const target = String(formData.get('target') ?? '');
  return {
    group: String(formData.get('group') ?? '') as ContactGroup,
    href: String(formData.get('href') ?? ''),
    iconName,
    label: String(formData.get('label') ?? ''),
    ariaLabel: String(formData.get('ariaLabel') ?? ''),
    target: target ? target : null,
  };
}

export async function createContactLink(formData: FormData) {
  const fields = readFields(formData);
  const count = await prisma.contactLink.count({ where: { group: fields.group } });
  await prisma.contactLink.create({ data: { ...fields, order: count } });

  revalidatePath('/');
  revalidatePath('/admin/contact');
  redirect('/admin/contact');
}

export async function updateContactLink(id: number, formData: FormData) {
  const fields = readFields(formData);
  await prisma.contactLink.update({ where: { id }, data: fields });

  revalidatePath('/');
  revalidatePath('/admin/contact');
  redirect('/admin/contact');
}

export async function deleteContactLink(id: number) {
  await prisma.contactLink.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/contact');
}

export async function moveContactLink(id: number, direction: 'up' | 'down') {
  const item = await prisma.contactLink.findUniqueOrThrow({ where: { id } });
  const neighbor = await prisma.contactLink.findFirst({
    where: {
      group: item.group,
      order: direction === 'up' ? { lt: item.order } : { gt: item.order },
    },
    orderBy: { order: direction === 'up' ? 'desc' : 'asc' },
  });
  if (!neighbor) return;

  await prisma.$transaction([
    prisma.contactLink.update({ where: { id: item.id }, data: { order: neighbor.order } }),
    prisma.contactLink.update({ where: { id: neighbor.id }, data: { order: item.order } }),
  ]);

  revalidatePath('/');
  revalidatePath('/admin/contact');
}
