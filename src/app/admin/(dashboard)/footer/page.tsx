import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getFooter } from '@/lib/content';
import { updateFooter } from './actions';

export default async function AdminFooterPage() {
  const footer = await getFooter();

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Footer</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updateFooter} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="copyrightName">Copyright name</Label>
            <Input id="copyrightName" name="copyrightName" defaultValue={footer.copyrightName} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rightsReservedText">Rights reserved text</Label>
            <Input id="rightsReservedText" name="rightsReservedText" defaultValue={footer.rightsReservedText} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="designNote">Design note</Label>
            <Input id="designNote" name="designNote" defaultValue={footer.designNote} required />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}
