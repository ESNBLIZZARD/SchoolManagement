import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, FileSpreadsheet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getStudentsByClass, allClassNames } from '@/lib/mockData';

export default function ResultsEntry() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedExam, setSelectedExam] = useState('Mid-Term');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    setStudents(getStudentsByClass(selectedClass));
  }, [selectedClass]);

  const handleMarkChange = (id: string, value: string) => {
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 100)) {
      setMarks(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = () => {
    toast.success('Results submitted successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Results Entry</h1>
          <p className="text-muted-foreground">Enter and manage student marks for examinations.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <FileSpreadsheet className="w-4 h-4" /> Import Excel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-medium">Class</label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {allClassNames.map(cls => (
                <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Examination</label>
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mid-Term">Mid-Term Exam</SelectItem>
              <SelectItem value="Final">Final Exam</SelectItem>
              <SelectItem value="Unit-Test-1">Unit Test 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Subject</label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Marks Entry - {selectedSubject} ({selectedExam})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-1">Roll</div>
              <div className="col-span-5">Student Name</div>
              <div className="col-span-3">Marks (Out of 100)</div>
              <div className="col-span-3">Grade</div>
            </div>
            {students.map((student) => {
              const mark = parseInt(marks[student.id] || '0');
              const grade = mark >= 90 ? 'A+' : mark >= 80 ? 'A' : mark >= 70 ? 'B' : mark >= 60 ? 'C' : mark >= 40 ? 'D' : 'F';
              
              return (
                <div key={student.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="col-span-1 font-medium text-muted-foreground">{student.rollNo}</div>
                  <div className="col-span-5 font-medium">{student.name}</div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      placeholder="0"
                      className="w-24"
                      value={marks[student.id] || ''}
                      onChange={(e) => handleMarkChange(student.id, e.target.value)}
                    />
                  </div>
                  <div className="col-span-3">
                    <Badge variant={grade === 'F' ? 'destructive' : 'secondary'}>
                      {marks[student.id] ? grade : '-'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" className="gap-2" onClick={handleSubmit}>
          <Save className="w-4 h-4" /> Save Results
        </Button>
      </div>
    </div>
  );
}
