import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { EDUCATION_ICON_NAMES } from '@/lib/icon-options';
import type { Education } from '@/generated/prisma/client';

export function EducationForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Education;
}) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div className="space-y-2">
        <Label htmlFor="institution">Institution</Label>
        <Input id="institution" name="institution" defaultValue={defaultValues?.institution} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="period">Period</Label>
        <Input id="period" name="period" defaultValue={defaultValues?.period} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={defaultValues?.title} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={defaultValues?.description} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="iconName">Icon</Label>
        <Select name="iconName" defaultValue={defaultValues?.iconName ?? EDUCATION_ICON_NAMES[0]}>
          <SelectTrigger id="iconName">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {EDUCATION_ICON_NAMES.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="details">Details (one per line)</Label>
        <Textarea id="details" name="details" defaultValue={defaultValues?.details.join('\n')} rows={4} />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
