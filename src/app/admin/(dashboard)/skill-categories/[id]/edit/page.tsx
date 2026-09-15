import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SKILL_CATEGORY_ICON_NAMES, SKILL_ICON_NAMES } from '@/lib/icon-options';
import { prisma } from '@/lib/db';
import { createSkill, deleteSkill, moveSkill, updateSkill, updateSkillCategory } from '../../actions';

export default async function EditSkillCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categoryId = Number(id);
  const category = await prisma.skillCategory.findUniqueOrThrow({
    where: { id: categoryId },
    include: { skills: { orderBy: { order: 'asc' } } },
  });

  return (
    <div className="space-y-6">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Edit category</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateSkillCategory.bind(null, categoryId)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={category.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryIconName">Icon</Label>
              <Select name="categoryIconName" defaultValue={category.categoryIconName}>
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
            <Button type="submit">Save</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Skills in this category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.skills.map((skill, index) => (
                <TableRow key={skill.id}>
                  <TableCell>
                    <form action={updateSkill.bind(null, skill.id)} className="flex items-center gap-2">
                      <Input name="name" defaultValue={skill.name} className="h-8" required />
                      <Select name="iconName" defaultValue={skill.iconName}>
                        <SelectTrigger className="h-8 w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SKILL_ICON_NAMES.map((name) => (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="submit" variant="secondary" size="sm">
                        Save
                      </Button>
                    </form>
                  </TableCell>
                  <TableCell>{skill.iconName}</TableCell>
                  <TableCell className="space-x-1 text-right">
                    <form action={moveSkill.bind(null, skill.id, 'up')} className="inline">
                      <Button type="submit" variant="outline" size="sm" disabled={index === 0}>
                        ↑
                      </Button>
                    </form>
                    <form action={moveSkill.bind(null, skill.id, 'down')} className="inline">
                      <Button type="submit" variant="outline" size="sm" disabled={index === category.skills.length - 1}>
                        ↓
                      </Button>
                    </form>
                    <form action={deleteSkill.bind(null, skill.id)} className="inline">
                      <Button type="submit" variant="destructive" size="sm">
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <form action={createSkill.bind(null, categoryId)} className="flex items-end gap-2 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="new-skill-name">New skill name</Label>
              <Input id="new-skill-name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-skill-icon">Icon</Label>
              <Select name="iconName" defaultValue={SKILL_ICON_NAMES[0]}>
                <SelectTrigger id="new-skill-icon" className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_ICON_NAMES.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Add skill</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
