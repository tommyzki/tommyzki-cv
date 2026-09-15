import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { logout } from '../login/actions';

// Admin pages read/write live DB content and sit behind auth — never
// statically prerender or cache them.
export const dynamic = 'force-dynamic';

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/hero', label: 'Hero' },
  { href: '/admin/header', label: 'Header' },
  { href: '/admin/about', label: 'About' },
  { href: '/admin/footer', label: 'Footer' },
  { href: '/admin/contact', label: 'Contact' },
  { href: '/admin/experience', label: 'Experience' },
  { href: '/admin/education', label: 'Education' },
  { href: '/admin/skill-categories', label: 'Skills' },
  { href: '/admin/project-categories', label: 'Projects' },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r-2 border-foreground bg-background p-4">
        <p className="mb-4 text-lg font-bold">Admin</p>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-2 py-1.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-6">
          <Button type="submit" variant="outline" size="sm" className="w-full">
            Sign out
          </Button>
        </form>
      </aside>
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
