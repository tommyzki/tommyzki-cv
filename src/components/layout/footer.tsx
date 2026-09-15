
import type { Footer as FooterData } from '@/generated/prisma/client';

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="border-t-2 border-foreground bg-background py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {data.copyrightName}. {data.rightsReservedText}</p>
        <p>{data.designNote}</p>
      </div>
    </footer>
  );
}
