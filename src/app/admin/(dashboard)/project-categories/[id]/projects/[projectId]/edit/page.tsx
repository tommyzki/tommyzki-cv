import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/db';
import { updateProject } from '../../../../actions';
import { ProjectForm } from '../../../project-form';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string; projectId: string }>;
}) {
  const { id, projectId } = await params;
  const categoryId = Number(id);
  const project = await prisma.project.findUniqueOrThrow({ where: { id: Number(projectId) } });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit project</CardTitle>
      </CardHeader>
      <CardContent>
        <ProjectForm action={updateProject.bind(null, categoryId, project.id)} defaultValues={project} />
      </CardContent>
    </Card>
  );
}
