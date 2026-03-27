import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Bell, Trash2, Edit2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const initialAnnouncements = [
  { id: '1', title: 'Final Examination Schedule Released', date: '2026-03-25', category: 'Academic', priority: 'High', status: 'Published' },
  { id: '2', title: 'Summer Vacation Dates', date: '2026-03-20', category: 'Holiday', priority: 'Normal', status: 'Published' },
  { id: '3', title: 'Parent-Teacher Meeting', date: '2026-03-18', category: 'Event', priority: 'Normal', status: 'Draft' },
];

export default function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    toast.success('Announcement deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">Manage school-wide notices and announcements.</p>
        </div>
        <Button className="gap-2" noAnimation>
          <Plus className="w-4 h-4" /> Create New
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {announcements.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.priority === 'High' ? 'destructive' : 'secondary'}>{item.category}</Badge>
                    <Badge variant="outline">{item.status}</Badge>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" noAnimation><Eye className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" noAnimation><Edit2 className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600" onClick={() => deleteAnnouncement(item.id)} noAnimation>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
