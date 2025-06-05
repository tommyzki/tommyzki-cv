
import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Languages } from 'lucide-react';
import educationData from '@/json/education-data.json';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Languages,
};

export default function EducationSection() {
  return (
    <section id="education" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Education</h2>
        <div className="max-w-2xl mx-auto space-y-8">
          {educationData.map((item, index) => {
            const IconComponent = item.iconName ? iconMap[item.iconName] : GraduationCap; // Default icon
            return (
              <Card key={index} className="border-2 border-foreground">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary shadow-pixel border-2 border-primary-foreground">
                    <IconComponent className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl md:text-2xl font-semibold">{item.institution}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">{item.period}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 pl-4 md:pl-6 pt-0 md:ml-[calc(3rem+1rem)]"> {/* Adjusted padding for content alignment */}
                  <h4 className="text-md font-medium text-foreground">{item.title}</h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {item.description}
                  </p>
                  {item.details && item.details.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {item.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
