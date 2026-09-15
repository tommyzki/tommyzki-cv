import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getHeader } from '@/lib/content';
import { updateHeader } from './actions';

export default async function AdminHeaderPage() {
  const header = await getHeader();
  const navItems = Array.isArray(header.navItems) ? (header.navItems as { label: string; href: string }[]) : [];
  const navItemsText = navItems.map((n) => `${n.label} | ${n.href}`).join('\n');

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Header</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updateHeader} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logoText">Logo text</Label>
            <Input id="logoText" name="logoText" defaultValue={header.logoText} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteTitle">Site title</Label>
            <Input id="siteTitle" name="siteTitle" defaultValue={header.siteTitle} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="navItems">Nav items (one per line, format: Label | href)</Label>
            <Textarea id="navItems" name="navItems" defaultValue={navItemsText} rows={5} />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}
