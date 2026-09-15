import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/db';
import { updateExperience } from '../../actions';
import { ExperienceForm } from '../../experience-form';

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.experience.findUniqueOrThrow({ where: { id: Number(id) } });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit experience entry</CardTitle>
      </CardHeader>
      <CardContent>
        <ExperienceForm action={updateExperience.bind(null, item.id)} defaultValues={item} />
      </CardContent>
    </Card>
  );
}
