import 'server-only';
import { prisma } from '@/lib/db';
import type { ProjectStatus } from '@/generated/prisma/client';

const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  DEPLOYED: 'Deployed',
  PUBLISHED: 'Published',
  COMING_SOON: 'Coming Soon',
};

export async function getHero() {
  return prisma.hero.findUniqueOrThrow({ where: { id: 1 } });
}

export async function getHeader() {
  return prisma.headerConfig.findUniqueOrThrow({ where: { id: 1 } });
}

export async function getAbout() {
  return prisma.about.findUniqueOrThrow({ where: { id: 1 } });
}

export async function getFooter() {
  return prisma.footer.findUniqueOrThrow({ where: { id: 1 } });
}

export async function getContact() {
  const links = await prisma.contactLink.findMany({ orderBy: { order: 'asc' } });
  return {
    formalContacts: links.filter((l) => l.group === 'FORMAL'),
    socialMediaLinks: links.filter((l) => l.group === 'SOCIAL'),
  };
}

export async function getExperience() {
  return prisma.experience.findMany({ orderBy: { order: 'asc' } });
}

export async function getEducation() {
  return prisma.education.findMany({ orderBy: { order: 'asc' } });
}

export async function getSkillCategories() {
  return prisma.skillCategory.findMany({
    orderBy: { order: 'asc' },
    include: { skills: { orderBy: { order: 'asc' } } },
  });
}

export async function getProjectCategories() {
  const categories = await prisma.projectCategory.findMany({
    orderBy: { order: 'asc' },
    include: { projects: { orderBy: { order: 'asc' } } },
  });
  return categories.map((category) => ({
    ...category,
    projects: category.projects.map((project) => ({
      ...project,
      status: PROJECT_STATUS_LABEL[project.status],
    })),
  }));
}
