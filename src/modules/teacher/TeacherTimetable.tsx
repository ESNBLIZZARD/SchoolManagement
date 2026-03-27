import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const timetable = [
  { day: 'Monday', classes: [
    { subject: 'Mathematics', time: '09:00 AM - 10:00 AM', room: 'Room 102', class: '10-A' },
    { subject: 'Mathematics', time: '11:30 AM - 12:30 PM', room: 'Room 204', class: '9-C' },
  ]},
  { day: 'Tuesday', classes: [
    { subject: 'Physics', time: '10:15 AM - 11:15 AM', room: 'Lab 1', class: '11-B' },
    { subject: 'Calculus', time: '01:30 PM - 02:30 PM', room: 'Room 301', class: '12-A' },
  ]},
  { day: 'Wednesday', classes: [
    { subject: 'Mathematics', time: '09:00 AM - 10:00 AM', room: 'Room 102', class: '10-A' },
  ]},
  { day: 'Thursday', classes: [
    { subject: 'Physics', time: '10:15 AM - 11:15 AM', room: 'Lab 1', class: '11-B' },
  ]},
  { day: 'Friday', classes: [
    { subject: 'Calculus', time: '01:30 PM - 02:30 PM', room: 'Room 301', class: '12-A' },
  ]},
];

export default function TeacherTimetable() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Timetable</h1>
        <p className="text-muted-foreground">Your weekly teaching schedule.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {timetable.map((day) => (
          <div key={day.day} className="space-y-4">
            <h3 className="font-bold text-center py-2 bg-gray-100 rounded-lg text-sm uppercase tracking-wider">{day.day}</h3>
            <div className="space-y-3">
              {day.classes.map((c, i) => (
                <Card key={i} className="border-l-4 border-l-primary">
                  <CardContent className="p-3 space-y-2">
                    <div className="text-xs font-bold text-primary">{c.class}</div>
                    <div className="text-sm font-semibold">{c.subject}</div>
                    <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {c.time}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{c.room}</div>
                  </CardContent>
                </Card>
              ))}
              {day.classes.length === 0 && (
                <div className="text-xs text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
                  No classes
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
