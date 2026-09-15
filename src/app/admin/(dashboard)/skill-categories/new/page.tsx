import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SKILL_CATEGORY_ICON_NAMES } from '@/lib/icon-options';
import { createSkillCategory } from '../actions';

export default function NewSkillCategoryPage() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>New skill category</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createSkillCategory} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryIconName">Icon</Label>
            <Select name="categoryIconName" defaultValue={SKILL_CATEGORY_ICON_NAMES[0]}>
              <SelectTrigger id="categoryIconName">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SKILL_CATEGORY_ICON_NAMES.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Create &amp; add skills</Button>
        </form>
      </CardContent>
    </Card>
  );
}
