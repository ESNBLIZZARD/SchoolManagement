import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, BookOpen, Calendar, Bell } from 'lucide-react';

export default function PublicHome() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Empowering the Next Generation</h1>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            EduStream provides a modern, digital-first learning environment for students to thrive and teachers to excel.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/announcements">
              <Button variant="secondary">
                View Notices
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="secondary">
                Administrative Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Academic Excellence</h3>
              <p className="text-muted-foreground">We maintain high standards of education with a curriculum designed for the future.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Digital Diary</h3>
              <p className="text-muted-foreground">Students and parents can track progress, attendance, and results in real-time.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Event Calendar</h3>
              <p className="text-muted-foreground">Stay updated with all school events, holidays, and extracurricular activities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Announcements Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Latest Announcements</h2>
            <Link to="/announcements" className="text-primary font-medium hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-medium text-primary mb-4 uppercase tracking-wider">
                  <Bell className="w-3 h-3" /> Important Notice
                </div>
                <h3 className="text-xl font-bold mb-3">Annual Sports Day 2026 Schedule</h3>
                <p className="text-muted-foreground mb-6">
                  The annual sports day is scheduled for next month. All students are requested to register for their preferred events...
                </p>
                <div className="text-sm text-muted-foreground">March 27, 2026</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
