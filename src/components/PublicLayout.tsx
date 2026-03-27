import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">EduStream</Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <Link to="/announcements" className="text-sm font-medium hover:text-primary">Notices</Link>
            <Link to="/holidays" className="text-sm font-medium hover:text-primary">Holidays</Link>
            <Link to="/diary" className="text-sm font-medium hover:text-primary">Student Diary</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm opacity-60">&copy; 2026 EduStream School Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
