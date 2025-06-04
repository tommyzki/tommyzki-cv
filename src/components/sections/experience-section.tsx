
'use client';

import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Award, Smartphone, GraduationCap } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const experiences = [
  {
    role: 'Senior Frontend Developer',
    company: 'PT. Akar Inti Technologi',
    period: '2024 – Present',
    description: 'Developed Angular and React apps. Led code quality and defect management.',
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    highlights: ['Awarded Best Employee (Semester 1)']
  },
  {
    role: 'Frontend Developer',
    company: 'PT. Ganda Visi Jayatama',
    period: '2021 – 2023',
    description: 'Built and maintained 10+ apps using Angular and React. Created standardized boilerplate for frontend projects.',
    icon: <Briefcase className="h-6 w-6 text-primary" />,
  },
  {
    role: 'Web Developer',
    company: 'CV. Anugerah Sakti Plastik',
    period: '2019 – 2020',
    description: 'Developed internal storage management system with Angular.',
    icon: <Briefcase className="h-6 w-6 text-primary" />
  },
  {
    role: 'Software Developer',
    company: 'PT. Multimedia Solution',
    period: '2018 – 2019',
    description: 'Enhanced cross-platform mobile features. Participated in 5+ development cycles.',
    icon: <Smartphone className="h-6 w-6 text-primary" />
  },
  {
    role: 'iOS Engineer Intern',
    company: 'PT. Mirai Internasional Indonesia',
    period: 'Internship',
    description: 'Contributed to iOS application development and gained practical experience in mobile engineering.',
    icon: <GraduationCap className="h-6 w-6 text-primary" />
  },
  {
    role: 'Laboratory Assistant',
    company: 'Multimedia Nusantara University',
    period: 'Assistant Role',
    description: 'Assisted in laboratory sessions, supported students, and maintained lab equipment.',
    icon: <GraduationCap className="h-6 w-6 text-primary" />
  },
];

export default function ExperienceSection() {
  const isMobile = useIsMobile();

  return (
    <section id="experience" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Professional Experience</h2>
        <div className="relative md:before:content-[''] md:before:absolute md:before:left-1/2 md:before:-translate-x-1/2 md:before:top-0 md:before:bottom-0 md:before:w-1 md:before:bg-foreground/30">
          {experiences.map((exp, index) => (
            <div key={index} className={`relative flex items-start gap-4 md:gap-8 mb-10 group ${isMobile ? 'ml-[calc(1.25rem_+_8px)]': ''}`}>
              {!isMobile && index % 2 === 0 && (
                <div className="md:w-1/2 md:text-right md:pr-8">
                  <Card className="hover:shadow-pixel-lg-hover transition-shadow duration-300 border-2 border-foreground">
                    <ExperienceCardContent {...exp} />
                  </Card>
                </div>
              )}
              {!isMobile && index % 2 !== 0 && (
                 <div className="md:w-1/2"></div> // Placeholder for alignment
              )}

              <div className={`absolute z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary shadow-pixel border-2 border-primary-foreground 
                              ${isMobile ? 'left-0 -translate-x-[calc(50%_+_1.25rem_+_8px)] top-0' : 'md:relative md:left-auto md:transform-none'}`}>
                {exp.icon}
              </div>
               {/* Vertical line for mobile, positioned relative to the icon */}
               {isMobile && (
                <div className="absolute top-0 bottom-0 w-1 bg-foreground/30 left-[calc(-1.25rem_-_8px_-_0.5px)] group-last:hidden"></div>
              )}


              <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} ${!isMobile && index % 2 !== 0 ? 'md:pl-8' : ''}`}>
                <Card className="hover:shadow-pixel-lg-hover transition-shadow duration-300 border-2 border-foreground">
                  <ExperienceCardContent {...exp} />
                </Card>
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
