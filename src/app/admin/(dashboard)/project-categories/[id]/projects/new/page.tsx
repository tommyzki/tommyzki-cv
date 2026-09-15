import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createProject } from '../../../actions';
import { ProjectForm } from '../../project-form';

export default async function NewProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categoryId = Number(id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>New project</CardTitle>
      </CardHeader>
      <CardContent>
        <ProjectForm action={createProject.bind(null, categoryId)} />
      </CardContent>
    </Card>
  );
}
