import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserCheck, Calendar, DollarSign, ClipboardList, Bell, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/modules/auth/authStore';

interface SidebarItem {
  title: string;
  href: string;
  icon: any;
}

const adminItems: SidebarItem[] = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { title: 'Students', href: '/admin/students', icon: Users },
  { title: 'Teachers', href: '/admin/teachers', icon: UserCheck },
  { title: 'Attendance', href: '/admin/attendance', icon: ClipboardList },
  { title: 'Finance', href: '/admin/finance', icon: DollarSign },
  { title: 'Timetable', href: '/admin/timetable', icon: Calendar },
  { title: 'Announcements', href: '/admin/announcements', icon: Bell },
];

const teacherItems: SidebarItem[] = [
  { title: 'Dashboard', href: '/teacher', icon: LayoutDashboard },
  { title: 'My Timetable', href: '/teacher/timetable', icon: Calendar },
  { title: 'Attendance', href: '/teacher/attendance', icon: ClipboardList },
  { title: 'Results', href: '/teacher/results', icon: ClipboardList },
];

export function DashboardLayout({ children, role }: { children: ReactNode; role: 'ADMIN' | 'TEACHER' }) {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const items = role === 'ADMIN' ? adminItems : teacherItems;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary">EduStream</h1>
          <p className="text-xs text-muted-foreground">{role} Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-gray-100"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={logout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
