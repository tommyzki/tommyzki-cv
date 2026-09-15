import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import SkillsSection from '@/components/sections/skills-section';
import ExperienceSection from '@/components/sections/experience-section';
import EducationSection from '@/components/sections/education-section';
import ProjectsSection from '@/components/sections/projects-section';
import ContactSection from '@/components/sections/contact-section';
import Footer from '@/components/layout/footer';
import {
  getAbout,
  getContact,
  getEducation,
  getExperience,
  getFooter,
  getHeader,
  getHero,
  getProjectCategories,
  getSkillCategories,
} from '@/lib/content';

// Content is served from Postgres and edited live via /admin, so the
// homepage is rendered per-request rather than baked in at build time.
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [hero, header, about, skillCategories, experience, education, projectCategories, contact, footer] =
    await Promise.all([
      getHero(),
      getHeader(),
      getAbout(),
      getSkillCategories(),
      getExperience(),
      getEducation(),
      getProjectCategories(),
      getContact(),
      getFooter(),
    ]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground">
      <Header data={header} />
      <main className="flex-grow container mx-auto px-4 space-y-16 md:space-y-24 xl:space-y-32 pt-8 pb-16 md:pt-12 md:pb-24">
        <HeroSection data={hero} />
        <AboutSection data={about} />
        <SkillsSection categories={skillCategories} />
        <ExperienceSection experiences={experience} />
        <EducationSection items={education} />
        <ProjectsSection categories={projectCategories} />
        <ContactSection contact={contact} />
      </main>
      <Footer data={footer} />
    </div>
  );
}
