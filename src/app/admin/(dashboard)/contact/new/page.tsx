import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createContactLink } from '../actions';
import { ContactForm } from '../contact-form';

export default function NewContactLinkPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New contact link</CardTitle>
      </CardHeader>
      <CardContent>
        <ContactForm action={createContactLink} />
      </CardContent>
    </Card>
  );
}
