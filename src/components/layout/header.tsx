import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="#home" className="flex items-center gap-2 text-lg font-bold text-foreground hover:text-primary transition-colors">
          <span className="text-2xl font-bold text-primary">宮崎</span>
          Tommy Portfolio
        </Link>
        
        <nav className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild className="text-sm font-medium hover:bg-accent hover:text-accent-foreground active:translate-y-0 active:shadow-none border-none shadow-none">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-foreground shadow-pixel hover:shadow-pixel-hover active:shadow-pixel-active">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background border-foreground border-l-2">
              <SheetHeader>
                <SheetTitle className="sr-only">Main Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  A list of navigation links to different sections of the portfolio.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 p-6 pt-2">
                <Link href="#home" className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                  <span className="text-2xl font-bold text-primary">宮崎</span>
                  Tommy Portfolio
                </Link>
                {navItems.map((item) => (
                  <Button key={item.label} variant="ghost" asChild className="w-full justify-start text-base hover:bg-accent hover:text-accent-foreground active:translate-y-0 active:shadow-none border-none shadow-none">
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
