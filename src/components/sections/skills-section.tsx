import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeXml, Braces, Palette, Cog, Terminal, Database, GitFork, Users2, Languages, Globe2 } from 'lucide-react';

// Helper icon for Tools & Methodologies, defined before use
const Settings = Cog;

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <Braces className="h-5 w-5 mr-2 text-primary" />,
    skills: [
      { name: 'JavaScript', icon: <Braces className="h-4 w-4 mr-1" /> },
      { name: 'TypeScript', icon: <Braces className="h-4 w-4 mr-1" /> },
      { name: 'HTML5', icon: <CodeXml className="h-4 w-4 mr-1" /> },
      { name: 'CSS', icon: <Palette className="h-4 w-4 mr-1" /> },
      { name: 'SCSS', icon: <Palette className="h-4 w-4 mr-1" /> },
      { name: 'Python', icon: <Terminal className="h-4 w-4 mr-1" /> },
    ]
  },
  {
    title: 'Frameworks & Libraries',
    icon: <Cog className="h-5 w-5 mr-2 text-primary" />,
    skills: [
      { name: 'Angular', icon: <Cog className="h-4 w-4 mr-1" /> },
      { name: 'React', icon: <Cog className="h-4 w-4 mr-1" /> },
      { name: 'Stencil', icon: <Cog className="h-4 w-4 mr-1" /> },
    ]
  },
  {
    title: 'Tools & Methodologies',
    icon: <Settings className="h-5 w-5 mr-2 text-primary" />,
    skills: [
      { name: 'Git', icon: <GitFork className="h-4 w-4 mr-1" /> },
      { name: 'REST APIs', icon: <Database className="h-4 w-4 mr-1" /> },
      { name: 'Agile Methodologies', icon: <Users2 className="h-4 w-4 mr-1" /> },
    ]
  },
  {
    title: 'Languages Spoken',
    icon: <Globe2 className="h-5 w-5 mr-2 text-primary" />,
    skills: [
      { name: 'Indonesian (Native)', icon: <Languages className="h-4 w-4 mr-1" /> },
      { name: 'English (Fluent)', icon: <Languages className="h-4 w-4 mr-1" /> },
      { name: 'Japanese (JFT A2 Certified)', icon: <Languages className="h-4 w-4 mr-1" /> },
    ]
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold text-center text-foreground">Key Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {skillCategories.map((category) => (
              <div key={category.title}>
                <h3 className="flex items-center text-xl md:text-2xl font-semibold text-foreground mb-4 justify-center md:justify-start">
                  {category.icon}
                  {category.title}
                </h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                  {category.skills.map((skill) => (
                    <Badge key={skill.name} variant="secondary" className="text-sm md:text-base px-3 py-2 border-secondary-foreground shadow-pixel hover:shadow-pixel-hover cursor-default">
                      {skill.icon}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
