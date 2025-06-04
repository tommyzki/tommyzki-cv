import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="home" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-none overflow-hidden border-4 border-foreground shadow-pixel-lg">
            <Image
              src="https://placehold.co/256x256.png"
              alt="Tommy Miyazaki - Pixel Art Avatar"
              width={256}
              height={256}
              priority
              className="object-cover w-full h-full"
              data-ai-hint="pixel avatar"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Tommy Miyazaki
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 font-medium">
              Frontend Developer | Expert in Angular & React | Building Responsive & Scalable Web Applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" variant="default" className="bg-primary text-primary-foreground border-primary-foreground shadow-[2px_2px_0px_hsl(var(--primary-foreground))] hover:shadow-[3px_3px_0px_hsl(var(--primary-foreground))] active:shadow-[1px_1px_0px_hsl(var(--primary-foreground))]">
                <Link href="#contact">Hire Me</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-foreground text-foreground hover:bg-accent hover:text-accent-foreground">
                <Link href="#projects">View My Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
