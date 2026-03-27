import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Check, X, Save, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { getStudentsByClass, allClassNames } from '@/lib/mockData';

interface StudentAttendance {
  id: string;
  name: string;
  rollNo: string;
  status: 'Present' | 'Absent' | 'Late' | null;
}

export default function AttendanceMarking() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [students, setStudents] = useState<StudentAttendance[]>([]);

  useEffect(() => {
    const classStudents = getStudentsByClass(selectedClass).map(s => ({
      id: s.id,
      name: s.name,
      rollNo: s.rollNo,
      status: null as 'Present' | 'Absent' | 'Late' | null,
    }));
    setStudents(classStudents);
  }, [selectedClass]);

  const updateStatus = (id: string, status: 'Present' | 'Absent' | 'Late') => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(s => ({ ...s, status: 'Present' })));
  };

  const handleSubmit = () => {
    const unMarked = students.filter(s => s.status === null);
    if (unMarked.length > 0) {
      toast.error(`Please mark attendance for all students. ${unMarked.length} remaining.`);
      return;
    }
    toast.success('Attendance submitted successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mark Attendance</h1>
          <p className="text-muted-foreground">Select class and mark student attendance for today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CalendarIcon className="w-4 h-4" /> {new Date().toLocaleDateString()}
          </div>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {allClassNames.map(cls => (
                <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <CardTitle className="text-lg">Student List - {selectedClass}</CardTitle>
          <Button variant="outline" size="sm" onClick={markAllPresent} noAnimation>Mark All Present</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {student.rollNo}
                  </div>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-muted-foreground">Roll No: {student.rollNo}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={student.status === 'Present' ? 'default' : 'outline'}
                    className={student.status === 'Present' ? 'bg-green-600 hover:bg-green-700' : ''}
                    onClick={() => updateStatus(student.id, 'Present')}
                    noAnimation
                  >
                    <Check className="w-4 h-4 mr-1" /> Present
                  </Button>
                  <Button
                    size="sm"
                    variant={student.status === 'Absent' ? 'destructive' : 'outline'}
                    onClick={() => updateStatus(student.id, 'Absent')}
                    noAnimation
                  >
                    <X className="w-4 h-4 mr-1" /> Absent
                  </Button>
                  <Button
                    size="sm"
                    variant={student.status === 'Late' ? 'default' : 'outline'}
                    className={student.status === 'Late' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                    onClick={() => updateStatus(student.id, 'Late')}
                    noAnimation
                  >
                    Late
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" className="gap-2" onClick={handleSubmit}>
          <Save className="w-4 h-4" /> Submit Attendance
        </Button>
      </div>
    </div>
  );
}
