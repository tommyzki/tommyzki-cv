import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getEducation } from '@/lib/content';
import { deleteEducation, moveEducation } from './actions';

export default async function AdminEducationPage() {
  const items = await getEducation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Education</h1>
        <Button asChild>
          <Link href="/admin/education/new">New entry</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Institution</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Period</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{item.institution}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.period}</TableCell>
              <TableCell className="space-x-1 text-right">
                <form action={moveEducation.bind(null, item.id, 'up')} className="inline">
                  <Button type="submit" variant="outline" size="sm" disabled={index === 0}>
                    ↑
                  </Button>
                </form>
                <form action={moveEducation.bind(null, item.id, 'down')} className="inline">
                  <Button type="submit" variant="outline" size="sm" disabled={index === items.length - 1}>
                    ↓
                  </Button>
                </form>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/admin/education/${item.id}/edit`}>Edit</Link>
                </Button>
                <form action={deleteEducation.bind(null, item.id)} className="inline">
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
