import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { prisma } from '../src/lib/db';
import type { ProjectStatus } from '../src/generated/prisma/client';

function readJson<T>(name: string): T {
  const filePath = join(__dirname, '..', 'src', 'json', name);
  return JSON.parse(readFileSync(filePath, 'utf-8')) as T;
}

const STATUS_MAP: Record<string, ProjectStatus> = {
  Deployed: 'DEPLOYED',
  Published: 'PUBLISHED',
  'Coming Soon': 'COMING_SOON',
};

async function main() {
  const heroData = readJson<{
    name: string;
    tagline: string;
    aspirations: string;
    image: { src: string; alt: string; aiHint: string };
    buttons: { label: string; href: string }[];
  }>('hero-data.json');

  await prisma.hero.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      name: heroData.name,
      tagline: heroData.tagline,
      aspirations: heroData.aspirations,
      imageSrc: heroData.image.src,
      imageAlt: heroData.image.alt,
      imageAiHint: heroData.image.aiHint,
      buttons: heroData.buttons,
    },
    update: {
      name: heroData.name,
      tagline: heroData.tagline,
      aspirations: heroData.aspirations,
      imageSrc: heroData.image.src,
      imageAlt: heroData.image.alt,
      imageAiHint: heroData.image.aiHint,
      buttons: heroData.buttons,
    },
  });

  const headerData = readJson<{
    logoText: string;
    siteTitle: string;
    navItems: { label: string; href: string }[];
  }>('header-data.json');

  await prisma.headerConfig.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      logoText: headerData.logoText,
      siteTitle: headerData.siteTitle,
      navItems: headerData.navItems,
    },
    update: {
      logoText: headerData.logoText,
      siteTitle: headerData.siteTitle,
      navItems: headerData.navItems,
    },
  });

  const aboutData = readJson<{ title: string; paragraphs: string[] }>('about-data.json');
  await prisma.about.upsert({
    where: { id: 1 },
    create: { id: 1, title: aboutData.title, paragraphs: aboutData.paragraphs },
    update: { title: aboutData.title, paragraphs: aboutData.paragraphs },
  });

  const footerData = readJson<{
    copyrightName: string;
    rightsReservedText: string;
    designNote: string;
  }>('footer-data.json');
  await prisma.footer.upsert({
    where: { id: 1 },
    create: { id: 1, ...footerData },
    update: { ...footerData },
  });

  const contactData = readJson<{
    formalContacts: { href: string; iconName: string; label: string; ariaLabel: string; target?: string }[];
    socialMediaLinks: { href: string; iconName: string; label: string; ariaLabel: string; target?: string }[];
  }>('contact-data.json');

  await prisma.contactLink.deleteMany();
  await prisma.contactLink.createMany({
    data: [
      ...contactData.formalContacts.map((c, order) => ({ ...c, group: 'FORMAL' as const, order })),
      ...contactData.socialMediaLinks.map((c, order) => ({ ...c, group: 'SOCIAL' as const, order })),
    ],
  });

  const experienceData = readJson<
    { role: string; company: string; period: string; description: string; iconName: string; highlights?: string[] }[]
  >('experience-data.json');
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: experienceData.map((e, order) => ({ ...e, highlights: e.highlights ?? [], order })),
  });

  const educationData = readJson<
    {
      institution: string;
      period: string;
      title: string;
      description: string;
      details: string[];
      iconName: string;
    }[]
  >('education-data.json');
  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: educationData.map((e, order) => ({ ...e, order })),
  });

  const skillsData = readJson<
    { title: string; categoryIconName: string; skills: { name: string; iconName: string }[] }[]
  >('skills-data.json');
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  for (const [order, category] of skillsData.entries()) {
    await prisma.skillCategory.create({
      data: {
        order,
        title: category.title,
        categoryIconName: category.categoryIconName,
        skills: {
          create: category.skills.map((s, skillOrder) => ({ ...s, order: skillOrder })),
        },
      },
    });
  }

  const projectsData = readJson<
    {
      categoryTitle: string;
      projects: {
        title: string;
        description: string;
        link?: string;
        repo?: string;
        status: string;
        tags: string[];
        imagePlaceholder: string;
        imageAiHint: string;
      }[];
      showGithubButton?: boolean;
      showMediumButton?: boolean;
      mediumLink?: string;
    }[]
  >('projects-data.json');
  await prisma.project.deleteMany();
  await prisma.projectCategory.deleteMany();
  for (const [order, category] of projectsData.entries()) {
    await prisma.projectCategory.create({
      data: {
        order,
        categoryTitle: category.categoryTitle,
        showGithubButton: category.showGithubButton ?? false,
        showMediumButton: category.showMediumButton ?? false,
        mediumLink: category.mediumLink,
        projects: {
          create: category.projects.map((p, projectOrder) => ({
            order: projectOrder,
            title: p.title,
            description: p.description,
            link: p.link,
            repo: p.repo,
            status: STATUS_MAP[p.status],
            tags: p.tags,
            imagePlaceholder: p.imagePlaceholder,
            imageAiHint: p.imageAiHint,
          })),
        },
      },
    });
  }

  console.log('Seed complete.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
