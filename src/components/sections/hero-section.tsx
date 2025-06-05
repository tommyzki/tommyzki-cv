
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import heroData from '@/json/hero-data.json';

export default function HeroSection() {
  return (
    <section id="home" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-none overflow-hidden border-4 border-foreground shadow-pixel-lg">
            <Image
              src={heroData.image.src}
              alt={heroData.image.alt}
              width={256}
              height={256}
              priority
              className="object-cover w-full h-full"
              data-ai-hint={heroData.image.aiHint}
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {heroData.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-2 font-medium">
              {heroData.tagline}
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-8">
              {heroData.aspirations}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {heroData.buttons.map((button) => (
                <Button 
                  key={button.label} 
                  asChild 
                  size="lg" 
                  variant={button.label === 'Hire Me' ? 'default' : 'outline'} 
                  className={
                    button.label === 'Hire Me' 
                    ? "bg-primary text-primary-foreground border-primary-foreground shadow-[2px_2px_0px_hsl(var(--primary-foreground))] hover:shadow-[3px_3px_0px_hsl(var(--primary-foreground))] active:shadow-[1px_1px_0px_hsl(var(--primary-foreground))]" 
                    : "border-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
                  }
                >
                  <Link href={button.href}>{button.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
