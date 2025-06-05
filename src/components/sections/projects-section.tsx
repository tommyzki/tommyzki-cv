
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Github, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import projectData from '@/json/projects-data.json'; // Import the JSON data

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
                            variant={(project.status === 'Deployed' || project.status === 'Published') ? 'default' : project.status === 'Coming Soon' ? 'secondary' : 'outline'}
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
                 {category.showMediumButton && category.mediumLink && (
                  <div className="text-center pt-8">
                    <Button asChild variant="default" size="lg" className="bg-accent text-accent-foreground border-accent-foreground shadow-[2px_2px_0px_hsl(var(--accent-foreground))] hover:shadow-[3px_3px_0px_hsl(var(--accent-foreground))] active:shadow-[1px_1px_0px_hsl(var(--accent-foreground))]">
                      <Link href={category.mediumLink} target="_blank" rel="noopener noreferrer">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Visit my Medium
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
