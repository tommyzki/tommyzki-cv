import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/db';
import { updateEducation } from '../../actions';
import { EducationForm } from '../../education-form';

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.education.findUniqueOrThrow({ where: { id: Number(id) } });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit education entry</CardTitle>
      </CardHeader>
      <CardContent>
        <EducationForm action={updateEducation.bind(null, item.id)} defaultValues={item} />
      </CardContent>
    </Card>
  );
}
