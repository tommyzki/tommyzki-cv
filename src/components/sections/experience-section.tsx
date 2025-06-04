
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Award, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const experiences = [
  {
    role: 'Senior Frontend Developer',
    company: 'PT. Akar Inti Technologi',
    period: '2021 - Present',
    description: 'Led development of key features for enterprise-level applications. Mentored junior developers and championed code quality initiatives. Received "Best Employee Award" for outstanding performance.',
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    highlights: ['Best Employee Award', 'Code Quality Leadership']
  },
  {
    role: 'Frontend Developer',
    company: 'PT. Ganda Visi Jayatama',
    period: '2019 - 2021',
    description: 'Developed and maintained responsive web applications using Angular and React. Collaborated with cross-functional teams to deliver high-quality products.',
    icon: <Users className="h-6 w-6 text-primary" />
  },
  {
    role: 'Junior Web Developer',
    company: 'CV. Anugerah Sakti Plastik',
    period: '2017 - 2019',
    description: 'Assisted in the development of internal web tools and company website. Gained foundational experience in web technologies and agile methodologies.',
    icon: <Briefcase className="h-6 w-6 text-primary" />
  },
];

export default function ExperienceSection() {
  const isMobile = useIsMobile();

  return (
    <section id="experience" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Professional Experience</h2>
        {/* 
          Mobile timeline line: theme(spacing.5) is icon's left offset (1.25rem)
                               theme(spacing.10)/2 is half icon's width (2.5rem/2 = 1.25rem)
                               Total 2.5rem. Subtract 1px for half the line's width (w-0.5 is 2px).
          Desktop timeline line: centered with mx-auto.
        */}
        <div className="relative space-y-12 before:absolute before:inset-y-0 before:left-0 before:ml-[calc(theme(spacing.5)_+_theme(spacing.10)/2_-_1px)] before:h-full before:w-0.5 before:bg-foreground/30 md:before:mx-auto md:before:ml-0">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-start md:items-center gap-4 md:gap-8 group">
              <div className="hidden md:block w-1/2 md:pr-8 text-right">
                {index % 2 === 0 && (
                  <Card className="hover:shadow-pixel-lg-hover transition-shadow duration-300">
                    <ExperienceCardContent {...exp} />
                  </Card>
                )}
              </div>
              
              {/* Icon positioning: absolute on mobile, static and centered on desktop */}
              <div className="absolute left-5 top-1 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary shadow-pixel border-2 border-primary-foreground md:relative md:left-auto md:top-auto md:translate-x-[-50%]">
                {exp.icon}
              </div>

              {/* 
                Content wrapper for card. 
                Mobile padding-left: icon_left (spacing.5) + icon_width (spacing.10) + gap (spacing.4) = 1.25rem + 2.5rem + 1rem = 4.75rem (76px)
                Desktop padding-left: md:pl-8 for right-aligned cards, md:pl-0 for left (handled by flex gap)
              */}
              <div className={`w-full pl-[calc(theme(spacing.5)_+theme(spacing.10)_+theme(spacing.4))] md:w-1/2 ${index % 2 === 0 && !isMobile ? 'md:pl-0' : 'md:pl-8'}`}>
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
          ))}
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
}

const ExperienceCardContent: React.FC<ExperienceCardProps> = ({ role, company, period, description, highlights }) => (
  <>
    <CardHeader>
      <CardTitle className="text-xl font-semibold">{role}</CardTitle>
      <CardDescription className="text-base text-muted-foreground">{company} | {period}</CardDescription>
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

