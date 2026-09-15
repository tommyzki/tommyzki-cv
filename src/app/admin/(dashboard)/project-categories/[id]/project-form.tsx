import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Project } from '@/generated/prisma/client';

const STATUS_OPTIONS: { value: Project['status']; label: string }[] = [
  { value: 'DEPLOYED', label: 'Deployed' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'COMING_SOON', label: 'Coming Soon' },
];

export function ProjectForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Project;
}) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={defaultValues?.title} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={defaultValues?.description} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="link">Link (optional)</Label>
        <Input id="link" name="link" defaultValue={defaultValues?.link ?? ''} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="repo">Repo (optional)</Label>
        <Input id="repo" name="repo" defaultValue={defaultValues?.repo ?? ''} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status" defaultValue={defaultValues?.status ?? 'DEPLOYED'}>
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (one per line)</Label>
        <Textarea id="tags" name="tags" defaultValue={defaultValues?.tags.join('\n')} rows={3} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="imagePlaceholder">Image URL</Label>
        <Input id="imagePlaceholder" name="imagePlaceholder" defaultValue={defaultValues?.imagePlaceholder} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="imageAiHint">Image AI hint</Label>
        <Input id="imageAiHint" name="imageAiHint" defaultValue={defaultValues?.imageAiHint} />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
