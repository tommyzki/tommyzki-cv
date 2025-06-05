
import type React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeXml, Braces, Palette, Cog, Terminal, Database, GitFork, Users2, Languages, Globe2 } from 'lucide-react';
import skillsData from '@/json/skills-data.json';

const iconMap: Record<string, React.ElementType> = {
  Braces,
  CodeXml,
  Palette,
  Cog,
  Terminal,
  Database,
  GitFork,
  Users2,
  Languages,
  Globe2,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold text-center text-foreground">Key Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {skillsData.map((category) => {
              const CategoryIcon = iconMap[category.categoryIconName];
              return (
                <div key={category.title}>
                  <h3 className="flex items-center text-xl md:text-2xl font-semibold text-foreground mb-4 justify-center md:justify-start">
                    {CategoryIcon && <CategoryIcon className="h-5 w-5 mr-2 text-primary" />}
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                    {category.skills.map((skill) => {
                      const SkillIcon = iconMap[skill.iconName];
                      return (
                        <Badge key={skill.name} variant="secondary" className="text-sm md:text-base px-3 py-2 border-secondary-foreground shadow-pixel hover:shadow-pixel-hover cursor-default">
                          {SkillIcon && <SkillIcon className="h-4 w-4 mr-1" />}
                          {skill.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
