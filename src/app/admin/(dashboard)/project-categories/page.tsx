import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getProjectCategories } from '@/lib/content';
import { deleteProjectCategory, moveProjectCategory } from './actions';

export default async function AdminProjectCategoriesPage() {
  const categories = await getProjectCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Project categories</h1>
        <Button asChild>
          <Link href="/admin/project-categories/new">New category</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead># projects</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell>{category.categoryTitle}</TableCell>
              <TableCell>{category.projects.length}</TableCell>
              <TableCell className="space-x-1 text-right">
                <form action={moveProjectCategory.bind(null, category.id, 'up')} className="inline">
                  <Button type="submit" variant="outline" size="sm" disabled={index === 0}>
                    ↑
                  </Button>
                </form>
                <form action={moveProjectCategory.bind(null, category.id, 'down')} className="inline">
                  <Button type="submit" variant="outline" size="sm" disabled={index === categories.length - 1}>
                    ↓
                  </Button>
                </form>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/admin/project-categories/${category.id}/edit`}>Edit</Link>
                </Button>
                <form action={deleteProjectCategory.bind(null, category.id)} className="inline">
                  <Button type="submit" variant="destructive" size="sm">
                    Delete
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
