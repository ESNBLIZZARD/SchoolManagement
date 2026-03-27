import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

const announcements = [
  {
    id: '1',
    title: 'Final Examination Schedule Released',
    content: 'The final examination for the academic year 2025-26 will commence from April 15th. Detailed timetable is available in the student portal.',
    date: 'March 25, 2026',
    category: 'Academic',
    priority: 'High'
  },
  {
    id: '2',
    title: 'Summer Vacation Dates',
    content: 'The school will remain closed for summer vacation from May 10th to June 15th. School will reopen on June 16th.',
    date: 'March 20, 2026',
    category: 'Holiday',
    priority: 'Normal'
  },
  {
    id: '3',
    title: 'Parent-Teacher Meeting',
    content: 'A parent-teacher meeting is scheduled for next Saturday to discuss the progress of students in the recent mock tests.',
    date: 'March 18, 2026',
    category: 'Event',
    priority: 'Normal'
  }
];

export default function AnnouncementsPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">School Announcements</h1>
        </div>

        <div className="space-y-6">
          {announcements.map((item) => (
            <Card key={item.id} className="overflow-hidden border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={item.priority === 'High' ? 'destructive' : 'secondary'}>
                    {item.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {item.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
