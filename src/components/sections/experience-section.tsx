
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
    description: ' I’ve been working since January 2024, I’ve been deeply involved in developing and enhancing web applications using Angular and React. I take pride in leading the code quality process and managing incoming tickets and defects to ensure smooth development cycles. My dedication and performance were recognized when I was awarded Best Employee for Semester 1.',
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    highlights: ['Awarded Best Employee (Semester 1)']
  },
  {
    role: 'Frontend Developer',
    company: 'PT. Ganda Visi Jayatama',
    period: '2021 – 2023',
    description: 'Developed and maintained more than ten applications and web pages using Angular and React. I initiated and led the creation of a standardized boilerplate, which significantly improved the consistency and efficiency of our frontend development. My focus was always on writing clean, scalable code and mentoring teammates on best practices.',
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    highlights: ['initiated and led the creation of a standardized boilerplate']
  },
  {
    role: 'Web Developer',
    company: 'CV. Anugerah Sakti Plastik',
    period: '2019 – 2020',
    description: 'built and maintained an internal storage management system using Angular. This system helped streamline the company’s inventory operations and improved internal workflows. I collaborated closely with stakeholders to ensure the solution met their needs and was easy to use.',
    icon: <Briefcase className="h-6 w-6 text-primary" />,
  },
  {
    role: 'Software Developer',
    company: 'PT. Multimedia Solution',
    period: '2018 – 2019',
    description: 'as a Mobile Cross Platform Engineer. I contributed to the development of several new features across platforms and participated in more than five full development cycles. I also provided effort estimates and collaborated with designers and backend developers to ensure seamless integration and delivery.',
    icon: <Smartphone className="h-6 w-6 text-primary" />
  },
  {
    role: 'iOS Engineer Intern',
    company: 'PT. Mirai Internasional Indonesia',
    period: 'Internship',
    description: 'began my professional journey as an iOS Engineer Intern at PT. Mirai Internasional Indonesia from November 2016 to April 2017. I built iOS applications from the ground up and successfully deployed them to the App Store. This experience gave me a strong foundation in mobile development and introduced me to real-world software engineering practices.',
    icon: <GraduationCap className="h-6 w-6 text-primary" />
  },
  {
    role: 'Laboratory Assistant',
    company: 'Multimedia Nusantara University',
    period: 'Assistant Role',
    description: 'While studying at Multimedia Nusantara University, I served as a Laboratory Assistant from August 2017 to January 2019. I supported the teaching of Mobile Cross Platform and iOS Programming classes, helping students understand complex concepts through hands-on guidance. I also prepared teaching materials and provided one-on-one support during lab sessions.',
    icon: <GraduationCap className="h-6 w-6 text-primary" />
  },
];

export default function ExperienceSection() {
  const isMobile = useIsMobile();

  return (
    <section id="experience" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Professional Experience</h2>
        <div className="relative space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-start md:items-center gap-4 md:gap-8 group">
              <div className="hidden md:block w-1/2 text-right">
                {index % 2 === 0 && (
                  <Card className="hover:shadow-pixel-lg-hover transition-shadow duration-300">
                    <ExperienceCardContent {...exp} />
                  </Card>
                )}
              </div>
              
              <div className="absolute z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary shadow-pixel border-2 border-primary-foreground md:relative ">
                {exp.icon}
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