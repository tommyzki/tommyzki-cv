import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getExperience } from '@/lib/content';
import { deleteExperience, moveExperience } from './actions';

export default async function AdminExperiencePage() {
  const items = await getExperience();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Experience</h1>
        <Button asChild>
          <Link href="/admin/experience/new">New entry</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Period</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{item.role}</TableCell>
              <TableCell>{item.company}</TableCell>
              <TableCell>{item.period}</TableCell>
              <TableCell className="space-x-1 text-right">
                <form action={moveExperience.bind(null, item.id, 'up')} className="inline">
                  <Button type="submit" variant="outline" size="sm" disabled={index === 0}>
                    ↑
                  </Button>
                </form>
                <form action={moveExperience.bind(null, item.id, 'down')} className="inline">
                  <Button type="submit" variant="outline" size="sm" disabled={index === items.length - 1}>
                    ↓
                  </Button>
                </form>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/admin/experience/${item.id}/edit`}>Edit</Link>
                </Button>
                <form action={deleteExperience.bind(null, item.id)} className="inline">
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
