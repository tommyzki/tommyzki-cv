'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

function parseButtons(raw: string): { label: string; href: string }[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split('|').map((s) => s.trim());
      return { label: label ?? '', href: href ?? '' };
    });
}

export async function updateHero(formData: FormData) {
  await prisma.hero.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      name: String(formData.get('name') ?? ''),
      tagline: String(formData.get('tagline') ?? ''),
      aspirations: String(formData.get('aspirations') ?? ''),
      imageSrc: String(formData.get('imageSrc') ?? ''),
      imageAlt: String(formData.get('imageAlt') ?? ''),
      imageAiHint: String(formData.get('imageAiHint') ?? ''),
      buttons: parseButtons(String(formData.get('buttons') ?? '')),
    },
    update: {
      name: String(formData.get('name') ?? ''),
      tagline: String(formData.get('tagline') ?? ''),
      aspirations: String(formData.get('aspirations') ?? ''),
      imageSrc: String(formData.get('imageSrc') ?? ''),
      imageAlt: String(formData.get('imageAlt') ?? ''),
      imageAiHint: String(formData.get('imageAiHint') ?? ''),
      buttons: parseButtons(String(formData.get('buttons') ?? '')),
    },
  });

  revalidatePath('/');
  revalidatePath('/admin/hero');
}
