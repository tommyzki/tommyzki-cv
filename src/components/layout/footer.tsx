export default function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-background py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Tommy Miyazaki. All rights reserved.</p>
        <p>Designed with a nostalgic pixel art theme.</p>
      </div>
    </footer>
  );
}
