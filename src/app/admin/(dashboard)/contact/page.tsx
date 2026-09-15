import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getContact } from '@/lib/content';
import { deleteContactLink, moveContactLink } from './actions';

function LinkRows({ links }: { links: Awaited<ReturnType<typeof getContact>>['formalContacts'] }) {
  return (
    <TableBody>
      {links.map((link, index) => (
        <TableRow key={link.id}>
          <TableCell>{link.label}</TableCell>
          <TableCell className="max-w-[240px] truncate">{link.href}</TableCell>
          <TableCell>{link.iconName}</TableCell>
          <TableCell className="space-x-1 text-right">
            <form action={moveContactLink.bind(null, link.id, 'up')} className="inline">
              <Button type="submit" variant="outline" size="sm" disabled={index === 0}>
                ↑
              </Button>
            </form>
            <form action={moveContactLink.bind(null, link.id, 'down')} className="inline">
              <Button type="submit" variant="outline" size="sm" disabled={index === links.length - 1}>
                ↓
              </Button>
            </form>
            <Button asChild variant="secondary" size="sm">
              <Link href={`/admin/contact/${link.id}/edit`}>Edit</Link>
            </Button>
            <form action={deleteContactLink.bind(null, link.id)} className="inline">
              <Button type="submit" variant="destructive" size="sm">
                Delete
              </Button>
            </form>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default async function AdminContactPage() {
  const { formalContacts, socialMediaLinks } = await getContact();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contact</h1>
        <Button asChild>
          <Link href="/admin/contact/new">New link</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Formal contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Href</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <LinkRows links={formalContacts} />
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Social media links</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Href</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <LinkRows links={socialMediaLinks} />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
