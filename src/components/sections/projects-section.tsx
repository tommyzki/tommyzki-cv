import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github } from 'lucide-react';

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold">My Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-base md:text-lg text-muted-foreground">
              I&apos;m currently curating my best work to showcase here. 
              Stay tuned for updates! In the meantime, feel free to explore my repositories on GitHub.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-background/50">
                  <CardHeader>
                    <CardTitle className="text-xl">Project Title {i}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-40 bg-muted flex items-center justify-center mb-4">
                      <span className="text-sm text-foreground">Placeholder Image</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      A brief description of project {i} will go here. It will highlight the technologies used and the problems solved.
                    </p>
                    <Button variant="outline" className="w-full">View Details (Soon)</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button asChild variant="default" size="lg" className="mt-8 bg-accent text-accent-foreground border-accent-foreground shadow-[2px_2px_0px_hsl(var(--accent-foreground))] hover:shadow-[3px_3px_0px_hsl(var(--accent-foreground))] active:shadow-[1px_1px_0px_hsl(var(--accent-foreground))]">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                Visit my GitHub
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
