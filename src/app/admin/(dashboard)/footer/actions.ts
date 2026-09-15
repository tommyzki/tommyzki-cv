'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

export async function updateFooter(formData: FormData) {
  const data = {
    copyrightName: String(formData.get('copyrightName') ?? ''),
    rightsReservedText: String(formData.get('rightsReservedText') ?? ''),
    designNote: String(formData.get('designNote') ?? ''),
  };

  await prisma.footer.upsert({
    where: { id: 1 },
    create: { id: 1, ...data },
    update: data,
  });

  revalidatePath('/');
  revalidatePath('/admin/footer');
}
