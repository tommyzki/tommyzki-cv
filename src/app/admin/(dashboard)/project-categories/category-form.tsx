import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ProjectCategory } from '@/generated/prisma/client';

export function CategoryForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: ProjectCategory;
}) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div className="space-y-2">
        <Label htmlFor="categoryTitle">Category title</Label>
        <Input id="categoryTitle" name="categoryTitle" defaultValue={defaultValues?.categoryTitle} required />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="showGithubButton" name="showGithubButton" defaultChecked={defaultValues?.showGithubButton} />
        <Label htmlFor="showGithubButton">Show &quot;Visit my GitHub&quot; button</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="showMediumButton" name="showMediumButton" defaultChecked={defaultValues?.showMediumButton} />
        <Label htmlFor="showMediumButton">Show &quot;Visit my Medium&quot; button</Label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="mediumLink">Medium link (used when the button above is on)</Label>
        <Input id="mediumLink" name="mediumLink" defaultValue={defaultValues?.mediumLink ?? ''} />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
