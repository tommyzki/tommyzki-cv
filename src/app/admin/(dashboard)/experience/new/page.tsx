import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createExperience } from '../actions';
import { ExperienceForm } from '../experience-form';

export default function NewExperiencePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New experience entry</CardTitle>
      </CardHeader>
      <CardContent>
        <ExperienceForm action={createExperience} />
      </CardContent>
    </Card>
  );
}
