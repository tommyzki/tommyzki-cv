import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/db';
import { updateContactLink } from '../../actions';
import { ContactForm } from '../../contact-form';

export default async function EditContactLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = await prisma.contactLink.findUniqueOrThrow({ where: { id: Number(id) } });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit contact link</CardTitle>
      </CardHeader>
      <CardContent>
        <ContactForm action={updateContactLink.bind(null, link.id)} defaultValues={link} />
      </CardContent>
    </Card>
  );
}
