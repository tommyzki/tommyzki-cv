import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getAbout } from '@/lib/content';
import { updateAbout } from './actions';

export default async function AdminAboutPage() {
  const about = await getAbout();

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updateAbout} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={about.title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paragraphs">Paragraphs (one per line)</Label>
            <Textarea id="paragraphs" name="paragraphs" defaultValue={about.paragraphs.join('\n')} rows={8} required />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}
