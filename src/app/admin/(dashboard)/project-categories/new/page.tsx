import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createProjectCategory } from '../actions';
import { CategoryForm } from '../category-form';

export default function NewProjectCategoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New project category</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryForm action={createProjectCategory} />
      </CardContent>
    </Card>
  );
}
