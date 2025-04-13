'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ClipboardList,
  Settings,
  Receipt,
  Scan,
  Activity,
  MessageSquare,
  FileText,
  User,
} from 'lucide-react';

const userLinks = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/application',
    label: 'Company Application',
    icon: FileText,
  },
  {
    href: '/dashboard/receipts',
    label: 'Receipts',
    icon: Receipt,
  },
  {
    href: '/dashboard/vat',
    label: 'VAT Records',
    icon: ClipboardList,
  },
  {
    href: '/dashboard/scans',
    label: 'Scanned Codes',
    icon: Scan,
  },
  {
    href: '/dashboard/activities',
    label: 'Recent Activities',
    icon: Activity,
  },
  {
    href: '/dashboard/messages',
    label: 'Messages',
    icon: MessageSquare,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <User className="h-6 w-6" />
          <span className="font-semibold">User Dashboard</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start gap-2 px-2">
          {userLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  pathname === link.href ? 'bg-accent' : 'transparent'
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 