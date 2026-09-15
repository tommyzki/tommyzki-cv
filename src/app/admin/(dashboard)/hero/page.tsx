import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getHero } from '@/lib/content';
import { updateHero } from './actions';

export default async function AdminHeroPage() {
  const hero = await getHero();
  const buttons = Array.isArray(hero.buttons) ? (hero.buttons as { label: string; href: string }[]) : [];
  const buttonsText = buttons.map((b) => `${b.label} | ${b.href}`).join('\n');

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Hero</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updateHero} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={hero.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" name="tagline" defaultValue={hero.tagline} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aspirations">Aspirations</Label>
            <Textarea id="aspirations" name="aspirations" defaultValue={hero.aspirations} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageSrc">Image URL</Label>
            <Input id="imageSrc" name="imageSrc" defaultValue={hero.imageSrc} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageAlt">Image alt text</Label>
            <Input id="imageAlt" name="imageAlt" defaultValue={hero.imageAlt} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageAiHint">Image AI hint</Label>
            <Input id="imageAiHint" name="imageAiHint" defaultValue={hero.imageAiHint} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buttons">Buttons (one per line, format: Label | href)</Label>
            <Textarea id="buttons" name="buttons" defaultValue={buttonsText} rows={4} />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}
