import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createEducation } from '../actions';
import { EducationForm } from '../education-form';

export default function NewEducationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New education entry</CardTitle>
      </CardHeader>
      <CardContent>
        <EducationForm action={createEducation} />
      </CardContent>
    </Card>
  );
}
