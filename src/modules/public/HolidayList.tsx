import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const holidays = [
  { name: 'New Year Day', date: 'Jan 01, 2026', day: 'Thursday' },
  { name: 'Republic Day', date: 'Jan 26, 2026', day: 'Monday' },
  { name: 'Holi', date: 'Mar 14, 2026', day: 'Saturday' },
  { name: 'Good Friday', date: 'Apr 03, 2026', day: 'Friday' },
  { name: 'Eid-ul-Fitr', date: 'Apr 10, 2026', day: 'Friday' },
  { name: 'Summer Vacation', date: 'May 10 - Jun 15, 2026', day: 'Multiple' },
  { name: 'Independence Day', date: 'Aug 15, 2026', day: 'Saturday' },
  { name: 'Gandhi Jayanti', date: 'Oct 02, 2026', day: 'Friday' },
  { name: 'Dussehra', date: 'Oct 20, 2026', day: 'Tuesday' },
  { name: 'Diwali', date: 'Oct 30, 2026', day: 'Friday' },
  { name: 'Christmas', date: 'Dec 25, 2026', day: 'Friday' },
];

export default function HolidayList() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Holiday List 2026</h1>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <div className="col-span-6">Holiday Name</div>
                <div className="col-span-4">Date</div>
                <div className="col-span-2">Day</div>
              </div>
              {holidays.map((h, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="col-span-6 font-medium">{h.name}</div>
                  <div className="col-span-4 text-sm text-muted-foreground">{h.date}</div>
                  <div className="col-span-2 text-sm text-muted-foreground">{h.day}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
