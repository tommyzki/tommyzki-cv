
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { About } from '@/generated/prisma/client';

interface AboutSectionProps {
  data: About;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-center md:text-left">{data.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
