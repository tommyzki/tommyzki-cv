import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

const educationData = {
  university: 'Multimedia Nusantara University',
  period: '2014 – 2018',
  degree: 'Bachelor’s in Computer Science',
  gpa: '3.35',
};

export default function EducationSection() {
  return (
    <section id="education" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Education</h2>
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-foreground">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary shadow-pixel border-2 border-primary-foreground">
                <GraduationCap className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl md:text-2xl font-semibold">{educationData.university}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">{educationData.period}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 pl-[calc(3rem_+_1rem_+_0.5rem)]">
              <p className="text-md font-medium text-foreground">{educationData.degree}</p>
              <p className="text-sm text-muted-foreground">GPA: {educationData.gpa}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
