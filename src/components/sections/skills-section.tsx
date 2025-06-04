import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeXml, Braces, Palette, Cog, Terminal, Database, Settings2, MoveRight } from 'lucide-react';

const skills = [
  { name: 'JavaScript', icon: <Braces className="h-4 w-4 mr-1" /> },
  { name: 'TypeScript', icon: <Braces className="h-4 w-4 mr-1" /> },
  { name: 'HTML5', icon: <CodeXml className="h-4 w-4 mr-1" /> },
  { name: 'CSS3', icon: <Palette className="h-4 w-4 mr-1" /> },
  { name: 'SCSS', icon: <Palette className="h-4 w-4 mr-1" /> },
  { name: 'Angular', icon: <Cog className="h-4 w-4 mr-1" /> },
  { name: 'React', icon: <Cog className="h-4 w-4 mr-1" /> },
  { name: 'Python', icon: <Terminal className="h-4 w-4 mr-1" /> },
  { name: 'REST APIs', icon: <Database className="h-4 w-4 mr-1" /> },
  { name: 'Git', icon: <MoveRight className="h-4 w-4 mr-1" /> }, // Using MoveRight as a placeholder for Git branches/flow
  { name: 'Agile', icon: <Settings2 className="h-4 w-4 mr-1" /> },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-center">Key Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {skills.map((skill) => (
                <Badge key={skill.name} variant="secondary" className="text-sm md:text-base px-3 py-2 border-secondary-foreground shadow-pixel hover:shadow-pixel-hover cursor-default">
                  {skill.icon}
                  {skill.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
