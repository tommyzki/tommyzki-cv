
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Project {
  title: string;
  description: string;
  link?: string;
  repo?: string;
  status: 'Deployed' | 'Coming Soon' | 'In Development';
  tags?: string[];
  imagePlaceholder: string;
  imageAiHint: string;
}

interface ProjectCategory {
  categoryTitle: string;
  projects: Project[];
  showGithubButton?: boolean;
}

const projectData: ProjectCategory[] = [
  {
    categoryTitle: 'Personal Projects',
    projects: [
      {
        title: 'tommyzki-cv (Portfolio)',
        description: 'My upcoming personal portfolio website, planned to be hosted on GitHub Pages, showcasing my journey and projects.',
        link: 'https://tommyzki.github.io/',
        repo: 'https://github.com/tommyzki/tommyzki-cv',
        status: 'Coming Soon',
        tags: ['Next.js', 'React', 'TailwindCSS'],
        imagePlaceholder: 'https://placehold.co/600x400.png',
        imageAiHint: 'portfolio website'
      },
      {
        title: 'tommyzki-ui',
        description: 'A library of reusable web components generated using StencilJS. These components are framework-agnostic and can be used in React, Angular, Vue, or vanilla HTML projects.',
        link: 'https://tommyzki.github.io/tommyzki-ui',
        repo: 'https://github.com/tommyzki/tommyzki-ui',
        status: 'Deployed',
        tags: ['StencilJS', 'Web Components', 'UI Library'],
        imagePlaceholder: 'https://placehold.co/600x400.png',
        imageAiHint: 'ui components code'
      },
    ],
    showGithubButton: true,
  },
  {
    categoryTitle: 'Company Projects (Conceptual Examples)',
    projects: [
      {
        title: 'Client Data Analytics Platform',
        description: 'Developed key frontend modules for a B2B data analytics platform using Angular, enabling clients to gain insights from large datasets. Focused on component reusability and performance.',
        status: 'Deployed',
        tags: ['Angular', 'Data Visualization', 'TypeScript', 'RxJS'],
        repo: 'https://github.com/tommyzki/dummy-company-project-1',
        imagePlaceholder: 'https://placehold.co/600x400.png',
        imageAiHint: 'analytics dashboard'
      },
      {
        title: 'Mobile-First E-commerce Site',
        description: 'Built responsive UI/UX features for a high-traffic e-commerce website using React and Next.js. Implemented state management solutions and integrated with various third-party APIs.',
        status: 'Deployed',
        tags: ['React', 'Next.js', 'State Management', 'E-commerce'],
        link: 'https://example-company.com/project-showcase/ecomm',
        imagePlaceholder: 'https://placehold.co/600x400.png',
        imageAiHint: 'online store shopping'
      },
      {
        title: 'Internal Workflow Automation Tool',
        description: 'Designed and implemented an internal tool with Angular to automate critical business workflows, significantly improving operational efficiency and reducing manual data entry.',
        status: 'Deployed',
        tags: ['Angular', 'Internal Tools', 'Automation'],
        imagePlaceholder: 'https://placehold.co/600x400.png',
        imageAiHint: 'workflow tool chart'
      }
    ]
  },
  {
    categoryTitle: 'Medium Articles',
    projects: [
      {
        title: 'Exploring Advanced React Patterns',
        description: 'A deep dive into advanced React patterns and techniques for building scalable and maintainable applications. Coming soon to Medium!',
        link: '#', // Placeholder link
        status: 'Coming Soon',
        tags: ['React', 'Frontend', 'Tech Article'],
        imagePlaceholder: 'https://placehold.co/600x400.png',
        imageAiHint: 'article code abstract'
      },
      {
        title: 'The Future of Web Components',
        description: 'An exploration of Web Components, their current state, and their potential impact on the future of web development. Stay tuned!',
        link: '#', // Placeholder link
        status: 'Coming Soon',
        tags: ['Web Components', 'Frontend', 'Opinion'],
        imagePlaceholder: 'https://placehold.co/600x400.png',
        imageAiHint: 'technology future'
      },
      {
        title: 'Becoming a PMO/BA from a Developer Background',
        description: 'Sharing insights and my journey on transitioning from a frontend developer role to project management or business analysis. Article in progress.',
        link: '#', // Placeholder link
        status: 'Coming Soon',
        tags: ['Career', 'Project Management', 'Business Analysis'],
        imagePlaceholder: 'https://placehold.co/600x400.png',
        imageAiHint: 'career path diagram'
      }
    ]
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl font-bold">My Projects & Articles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-12">
            {projectData.map((category) => (
              <div key={category.categoryTitle}>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 text-left border-b-2 border-primary pb-2">
                  {category.categoryTitle}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.projects.map((project) => (
                    <Card key={project.title} className="flex flex-col bg-card">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg md:text-xl mb-1">{project.title}</CardTitle>
                          <Badge
                            variant={project.status === 'Deployed' ? 'default' : project.status === 'Coming Soon' ? 'secondary' : 'outline'}
                            className="text-xs whitespace-nowrap"
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow space-y-3">
                        <div className="relative w-full h-40 mb-2 overflow-hidden border-2 shadow-pixel border-foreground">
                          <Image
                            src={project.imagePlaceholder}
                            alt={project.title}
                            fill
                            className="object-cover"
                            data-ai-hint={project.imageAiHint}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground flex-grow min-h-[60px]">
                          {project.description}
                        </p>
                        {project.tags && project.tags.length > 0 && (
                          <div className="mb-2 pt-1">
                            <h4 className="text-xs font-semibold mb-1.5 text-foreground">Keywords:</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.map(tag => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2 mt-auto pt-2">
                          {project.link && project.link !== '#' && (
                            <Button asChild variant="outline" size="sm" className="flex-1">
                              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                {category.categoryTitle === 'Medium Articles' ? 'Read Article' : 'View Live'}
                              </Link>
                            </Button>
                          )}
                           {project.link && project.link === '#' && category.categoryTitle === 'Medium Articles' && (
                            <Button variant="outline" size="sm" className="flex-1" disabled>
                              Read Article (Soon)
                            </Button>
                          )}
                          {project.repo && (
                            <Button asChild variant="secondary" size="sm" className="flex-1">
                              <Link href={project.repo} target="_blank" rel="noopener noreferrer">View Code</Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {category.showGithubButton && (
                  <div className="text-center pt-8">
                    <Button asChild variant="default" size="lg" className="bg-accent text-accent-foreground border-accent-foreground shadow-[2px_2px_0px_hsl(var(--accent-foreground))] hover:shadow-[3px_3px_0px_hsl(var(--accent-foreground))] active:shadow-[1px_1px_0px_hsl(var(--accent-foreground))]">
                      <Link href="https://github.com/tommyzki" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-5 w-5" />
                        Visit my personal GitHub
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

