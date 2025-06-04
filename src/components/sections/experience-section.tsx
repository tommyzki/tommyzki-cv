
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
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-foreground/30 md:before:mx-auto md:before:ml-0">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-start md:items-center gap-4 md:gap-8 group">
              <div className="hidden md:block w-1/2 md:pr-8 text-right">
                {index % 2 === 0 && (
                  <Card className="hover:shadow-pixel-lg-hover transition-shadow duration-300">
                    <ExperienceCardContent {...exp} />
                  </Card>
                )}
              </div>
              
              <div className="absolute left-5 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-pixel border-2 border-primary-foreground md:static md:left-auto md:translate-x-[-50%]">
                {exp.icon}
              </div>

              <div className="w-full md:w-1/2 md:pl-8">
                {isMobile ? (
                  // On mobile, always show the card in the main flow
                  <Card className="hover:shadow-pixel-lg-hover transition-shadow duration-300">
                    <ExperienceCardContent {...exp} />
                  </Card>
                ) : (
                  // On desktop
                  index % 2 !== 0 ? (
                    // Odd items on desktop: show card on the right
                    <Card className="hover:shadow-pixel-lg-hover transition-shadow duration-300">
                      <ExperienceCardContent {...exp} />
                    </Card>
                  ) : (
                    // Even items on desktop: card is on the left, show placeholder on the right for balance
                    <div className="hidden md:block"> {/* This div is only for desktop layout balancing */}
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
