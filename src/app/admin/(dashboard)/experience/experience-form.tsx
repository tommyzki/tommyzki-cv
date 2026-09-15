import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { EXPERIENCE_ICON_NAMES } from '@/lib/icon-options';
import type { Experience } from '@/generated/prisma/client';

export function ExperienceForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Experience;
}) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Input id="role" name="role" defaultValue={defaultValues?.role} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" defaultValue={defaultValues?.company} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="period">Period</Label>
        <Input id="period" name="period" defaultValue={defaultValues?.period} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={defaultValues?.description} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="iconName">Icon</Label>
        <Select name="iconName" defaultValue={defaultValues?.iconName ?? EXPERIENCE_ICON_NAMES[0]}>
          <SelectTrigger id="iconName">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {EXPERIENCE_ICON_NAMES.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="highlights">Highlights (one per line)</Label>
        <Textarea id="highlights" name="highlights" defaultValue={defaultValues?.highlights.join('\n')} rows={4} />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
