
import footerData from '@/json/footer-data.json';

export default function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-background py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {footerData.copyrightName}. {footerData.rightsReservedText}</p>
        <p>{footerData.designNote}</p>
      </div>
    </footer>
  );
}
