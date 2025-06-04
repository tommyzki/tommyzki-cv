import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-center md:text-left">About Me</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              As a dedicated Frontend Developer with over 5 years of experience, I specialize in crafting responsive and user-centric web applications using Angular and React. My passion lies in transforming complex challenges into elegant, intuitive solutions. I continuously strive to enhance user experiences through innovative design and efficient, scalable code, always keeping the end-user's needs at the forefront.
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Looking ahead, my vision for the next five years involves leveraging my analytical skills and growing interest in project oversight to transition into a Project Management Officer (PMO) or Business Analyst (BA) role. I believe my technical foundation and problem-solving abilities provide a strong springboard for such a move. I am enthusiastic about opportunities that allow me to contribute as a PMO, BA, Frontend Developer, or even in a Fullstack capacity, as I am always eager to broaden my skill set.
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              A significant long-term aspiration of mine is to work and contribute my skills in Japan. The country's innovative tech scene and unique culture are incredibly appealing. If you have or know of any opportunities in Japan that align with my profile—be it in frontend development, project management, or business analysis—I would be thrilled to connect and explore how I can bring value to your team.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
