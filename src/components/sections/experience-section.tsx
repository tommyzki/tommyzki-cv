
'use client';

import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Award, Smartphone, GraduationCap } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import experiencesData from '@/json/experience-data.json';

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Smartphone,
  GraduationCap,
};

export default function ExperienceSection() {
  const isMobile = useIsMobile();

  return (
    <section id="experience" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Professional Experience</h2>
        <div className="relative space-y-12">
          {experiencesData.map((exp, index) => {
            const IconComponent = exp.iconName ? iconMap[exp.iconName] : Briefcase; // Default to Briefcase if not found
            return (
              <div key={index} className="relative flex items-start md:items-center gap-4 md:gap-8 group">
                <div className="hidden md:block w-1/2 text-right">
                  {index % 2 === 0 && (
                    <Card className="hover:shadow-pixel-lg-hover transition-shadow duration-300">
                      <ExperienceCardContent {...exp} />
                    </Card>
                  )}
                </div>
                
                <div className="absolute z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary shadow-pixel border-2 border-primary-foreground md:relative ">
                  <IconComponent className="h-6 w-6 text-primary-foreground" /> {/* Adjusted icon color for better visibility on primary bg */}
                </div>

                <div className={`w-full pl-16 md:w-1/2 ${index % 2 === 0 ? '' : 'md:pl-0'}`}>
                  {isMobile ? (
                    <Card className="hover:shadow-pixel-lg-hover transition-shadow duration-300">
                      <ExperienceCardContent {...exp} />
                    </Card>
                  ) : (
                    index % 2 !== 0 ? (
                      <Card className="hover:shadow-pixel-lg-hover transition-shadow duration-300">
                        <ExperienceCardContent {...exp} />
                      </Card>
                    ) : (
                      <div className="hidden md:block"> {/* Placeholder for layout balance */}
                        <Card className="opacity-0 pointer-events-none"> 
                          <ExperienceCardContent {...exp} />
                        </Card>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights?: string[];
  // iconName is already part of the data from JSON, so not explicitly needed here unless used differently
}

const ExperienceCardContent: React.FC<ExperienceCardProps> = ({ role, company, period, description, highlights }) => (
  <>
    <CardHeader>
      <CardTitle className="text-xl font-semibold">{role}</CardTitle>
      <CardDescription className="text-base text-muted-foreground">{company}</CardDescription>
      <CardDescription className="text-base text-muted-foreground">{period}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <p className="text-sm text-foreground">{description}</p>
      {highlights && highlights.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {highlights.map(highlight => (
            <span key={highlight} className="flex items-center text-xs bg-accent text-accent-foreground px-2 py-1 border border-accent-foreground shadow-sm">
              <Award className="h-3 w-3 mr-1" /> {highlight}
            </span>
          ))}
        </div>
      )}
    </CardContent>
  </>
);
