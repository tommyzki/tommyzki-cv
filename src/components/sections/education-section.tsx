
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Languages } from 'lucide-react';

const educationData = [
  {
    institution: 'Multimedia Nusantara University',
    period: '2014 – 2018',
    title: 'Bachelor’s in Computer Science',
    description: "Gained a strong foundation in software development, data structures, algorithms, and computer systems. Completed various projects focusing on web and application development, culminating in a comprehensive final year project.",
    details: ['GPA: 3.35'],
    icon: <GraduationCap className="h-7 w-7 text-primary-foreground" />,
  },
  {
    institution: 'Yoshida Gakkou 吉田 学校',
    period: '2023', // You can update this period if needed
    title: 'JLP A2 Certificate',
    description: "Successfully completed an intensive Japanese language program, mastering foundational grammar, vocabulary, and conversational skills. Achieved JLP A2 certification, demonstrating proficiency in basic Japanese communication.",
    details: ['Score: 100 points'],
    icon: <Languages className="h-7 w-7 text-primary-foreground" />,
  }
];

export default function EducationSection() {
  return (
    <section id="education" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Education</h2>
        <div className="max-w-2xl mx-auto space-y-8">
          {educationData.map((item, index) => (
            <Card key={index} className="border-2 border-foreground">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary shadow-pixel border-2 border-primary-foreground">
                  {item.icon}
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
          ))}
        </div>
      </div>
    </section>
  );
}
