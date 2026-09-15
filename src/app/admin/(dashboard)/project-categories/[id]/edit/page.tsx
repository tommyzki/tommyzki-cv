import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { prisma } from '@/lib/db';
import { deleteProject, moveProject, updateProjectCategory } from '../../actions';
import { CategoryForm } from '../../category-form';

export default async function EditProjectCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categoryId = Number(id);
  const category = await prisma.projectCategory.findUniqueOrThrow({
    where: { id: categoryId },
    include: { projects: { orderBy: { order: 'asc' } } },
  });

  return (
    <div className="space-y-6">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Edit category</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryForm action={updateProjectCategory.bind(null, categoryId)} defaultValues={category} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Projects in this category</CardTitle>
          <Button asChild size="sm">
            <Link href={`/admin/project-categories/${categoryId}/projects/new`}>New project</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.projects.map((project, index) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell className="space-x-1 text-right">
                    <form action={moveProject.bind(null, categoryId, project.id, 'up')} className="inline">
                      <Button type="submit" variant="outline" size="sm" disabled={index === 0}>
                        ↑
                      </Button>
                    </form>
                    <form action={moveProject.bind(null, categoryId, project.id, 'down')} className="inline">
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        disabled={index === category.projects.length - 1}
                      >
                        ↓
                      </Button>
                    </form>
                    <Button asChild variant="secondary" size="sm">
                      <Link href={`/admin/project-categories/${categoryId}/projects/${project.id}/edit`}>Edit</Link>
                    </Button>
                    <form action={deleteProject.bind(null, categoryId, project.id)} className="inline">
                      <Button type="submit" variant="destructive" size="sm">
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
