import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import SkillsSection from '@/components/sections/skills-section';
import ExperienceSection from '@/components/sections/experience-section';
import ProjectsSection from '@/components/sections/projects-section';
import ContactSection from '@/components/sections/contact-section';
import Footer from '@/components/layout/footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 space-y-16 md:space-y-24 xl:space-y-32 pt-8 pb-16 md:pt-12 md:pb-24">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
