import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getSkillCategories } from '@/lib/content';
import { deleteSkillCategory, moveSkillCategory } from './actions';

export default async function AdminSkillCategoriesPage() {
  const categories = await getSkillCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Skill categories</h1>
        <Button asChild>
          <Link href="/admin/skill-categories/new">New category</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead># skills</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell>{category.title}</TableCell>
              <TableCell>{category.categoryIconName}</TableCell>
              <TableCell>{category.skills.length}</TableCell>
              <TableCell className="space-x-1 text-right">
                <form action={moveSkillCategory.bind(null, category.id, 'up')} className="inline">
                  <Button type="submit" variant="outline" size="sm" disabled={index === 0}>
                    ↑
                  </Button>
                </form>
                <form action={moveSkillCategory.bind(null, category.id, 'down')} className="inline">
                  <Button type="submit" variant="outline" size="sm" disabled={index === categories.length - 1}>
                    ↓
                  </Button>
                </form>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/admin/skill-categories/${category.id}/edit`}>Edit</Link>
                </Button>
                <form action={deleteSkillCategory.bind(null, category.id)} className="inline">
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
