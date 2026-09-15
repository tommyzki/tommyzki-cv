import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/db';

export default async function AdminDashboardPage() {
  const [experienceCount, educationCount, skillCategoryCount, projectCategoryCount, contactLinkCount] =
    await Promise.all([
      prisma.experience.count(),
      prisma.education.count(),
      prisma.skillCategory.count(),
      prisma.projectCategory.count(),
      prisma.contactLink.count(),
    ]);

  const sections = [
    { href: '/admin/hero', label: 'Hero', hint: 'Singleton' },
    { href: '/admin/header', label: 'Header', hint: 'Singleton' },
    { href: '/admin/about', label: 'About', hint: 'Singleton' },
    { href: '/admin/footer', label: 'Footer', hint: 'Singleton' },
    { href: '/admin/contact', label: 'Contact', hint: `${contactLinkCount} link(s)` },
    { href: '/admin/experience', label: 'Experience', hint: `${experienceCount} entr${experienceCount === 1 ? 'y' : 'ies'}` },
    { href: '/admin/education', label: 'Education', hint: `${educationCount} entr${educationCount === 1 ? 'y' : 'ies'}` },
    { href: '/admin/skill-categories', label: 'Skills', hint: `${skillCategoryCount} categor${skillCategoryCount === 1 ? 'y' : 'ies'}` },
    { href: '/admin/project-categories', label: 'Projects', hint: `${projectCategoryCount} categor${projectCategoryCount === 1 ? 'y' : 'ies'}` },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="transition-shadow hover:shadow-pixel-hover">
              <CardHeader>
                <CardTitle className="text-base">{section.label}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{section.hint}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
