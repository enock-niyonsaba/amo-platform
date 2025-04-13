import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  FileText,
  Activity,
  Shield,
  ClipboardList
} from 'lucide-react';

const adminLinks = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/users',
    label: 'Users',
    icon: Users,
  },
  {
    href: '/dashboard/applications',
    label: 'Applications',
    icon: ClipboardList,
  },
  {
    href: '/dashboard/activity',
    label: 'Activity',
    icon: Activity,
  },
  {
    href: '/dashboard/license',
    label: 'License',
    icon: Shield,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
]; 