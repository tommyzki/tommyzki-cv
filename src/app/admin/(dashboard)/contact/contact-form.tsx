import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CONTACT_ICON_NAMES } from '@/lib/icon-options';
import type { ContactLink } from '@/generated/prisma/client';

export function ContactForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: ContactLink;
}) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div className="space-y-2">
        <Label htmlFor="group">Group</Label>
        <Select name="group" defaultValue={defaultValues?.group ?? 'FORMAL'}>
          <SelectTrigger id="group">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FORMAL">Formal contact</SelectItem>
            <SelectItem value="SOCIAL">Social media</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="label">Label</Label>
        <Input id="label" name="label" defaultValue={defaultValues?.label} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="href">Href</Label>
        <Input id="href" name="href" defaultValue={defaultValues?.href} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ariaLabel">Aria label</Label>
        <Input id="ariaLabel" name="ariaLabel" defaultValue={defaultValues?.ariaLabel} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="iconName">Icon</Label>
        <Select name="iconName" defaultValue={defaultValues?.iconName ?? CONTACT_ICON_NAMES[0]}>
          <SelectTrigger id="iconName">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CONTACT_ICON_NAMES.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="target">Target</Label>
        <Select name="target" defaultValue={defaultValues?.target ?? '_self'}>
          <SelectTrigger id="target">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_self">Same tab (_self)</SelectItem>
            <SelectItem value="_blank">New tab (_blank)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
