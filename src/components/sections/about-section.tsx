import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-center md:text-left">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              I&apos;m a dedicated Frontend Developer with over 5 years of experience in building responsive and user-centric web applications using Angular and React. I thrive on transforming complex problems into elegant solutions and continuously seek to enhance user experience through innovative design and efficient code.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
