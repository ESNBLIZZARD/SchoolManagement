import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Save, Trash2, Clock } from 'lucide-react';
import { toast } from 'sonner';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = [
  '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM',
  '10:15 AM - 11:15 AM',
  '11:15 AM - 12:15 PM',
  '01:15 PM - 02:15 PM',
  '02:15 PM - 03:15 PM',
];

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science'];
const teachers = ['Prof. Smith', 'Dr. Johnson', 'Ms. Williams', 'Mr. Brown', 'Dr. Davis'];

export default function TimetableManagement() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [timetable, setTimetable] = useState<Record<string, any>>({});

  const handleCellChange = (day: string, slot: string, field: string, value: string) => {
    const key = `${day}-${slot}`;
    setTimetable(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  };

  const handleSave = () => {
    toast.success('Timetable saved successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Timetable Management</h1>
          <p className="text-muted-foreground">Create and manage class schedules and teacher assignments.</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10-A">Class 10-A</SelectItem>
              <SelectItem value="11-B">Class 11-B</SelectItem>
              <SelectItem value="9-C">Class 9-C</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2" onClick={handleSave}>
            <Save className="w-4 h-4" /> Save Timetable
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 bg-gray-50 border-b border-r w-[200px] text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Time Slot
              </th>
              {days.map(day => (
                <th key={day} className="p-4 bg-gray-50 border-b border-r text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(slot => (
              <tr key={slot}>
                <td className="p-4 border-b border-r bg-gray-50/50 font-medium text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-primary" /> {slot}
                  </div>
                </td>
                {days.map(day => {
                  const key = `${day}-${slot}`;
                  const cell = timetable[key] || {};
                  return (
                    <td key={day} className="p-2 border-b border-r hover:bg-gray-50 transition-colors">
                      <div className="space-y-2">
                        <Select 
                          value={cell.subject || ''} 
                          onValueChange={(v) => handleCellChange(day, slot, 'subject', v)}
                        >
                          <SelectTrigger className="h-8 text-xs border-none shadow-none focus:ring-0 p-1">
                            <SelectValue placeholder="Subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <Select 
                          value={cell.teacher || ''} 
                          onValueChange={(v) => handleCellChange(day, slot, 'teacher', v)}
                        >
                          <SelectTrigger className="h-8 text-xs border-none shadow-none focus:ring-0 p-1 text-muted-foreground">
                            <SelectValue placeholder="Teacher" />
                          </SelectTrigger>
                          <SelectContent>
                            {teachers.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
