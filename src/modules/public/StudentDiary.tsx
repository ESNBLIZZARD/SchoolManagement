import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, Calendar, ClipboardList } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockStudent = {
  name: 'John Doe',
  rollNo: '101',
  class: '10-A',
  attendance: '94%',
  results: [
    { subject: 'Mathematics', marks: 85, grade: 'A' },
    { subject: 'Physics', marks: 78, grade: 'B' },
    { subject: 'Chemistry', marks: 92, grade: 'A+' },
  ],
  timetable: [
    { day: 'Monday', subject: 'Mathematics', time: '09:00 AM' },
    { day: 'Tuesday', subject: 'Physics', time: '10:15 AM' },
  ]
};

export default function StudentDiary() {
  const [rollNo, setRollNo] = useState('');
  const [found, setFound] = useState(false);

  const handleSearch = () => {
    if (rollNo === '101') {
      setFound(true);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!found ? (
          <div className="text-center space-y-8 py-20">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <GraduationCap className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Student Digital Diary</h1>
              <p className="text-muted-foreground">Enter your roll number to view your academic progress.</p>
            </div>
            <div className="flex max-w-md mx-auto gap-2">
              <Input 
                placeholder="Enter Roll Number (e.g. 101)" 
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
              <Button onClick={handleSearch} className="gap-2" noAnimation>
                <Search className="w-4 h-4" /> View Diary
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{mockStudent.name}</h1>
                <p className="text-muted-foreground">Class {mockStudent.class} | Roll No: {mockStudent.rollNo}</p>
              </div>
              <Button variant="outline" onClick={() => setFound(false)} noAnimation>Change Student</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Overall Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{mockStudent.attendance}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Recent Grade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">A</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Next Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Math @ 9:00</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="results" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="results" className="gap-2"><ClipboardList className="w-4 h-4" /> Exam Results</TabsTrigger>
                <TabsTrigger value="timetable" className="gap-2"><Calendar className="w-4 h-4" /> Timetable</TabsTrigger>
              </TabsList>
              <TabsContent value="results" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {mockStudent.results.map((r, i) => (
                        <div key={i} className="flex items-center justify-between p-4">
                          <div className="font-medium">{r.subject}</div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">{r.marks}/100</span>
                            <span className="font-bold text-primary">{r.grade}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="timetable" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {mockStudent.timetable.map((t, i) => (
                        <div key={i} className="flex items-center justify-between p-4">
                          <div>
                            <div className="font-medium">{t.subject}</div>
                            <div className="text-xs text-muted-foreground">{t.day}</div>
                          </div>
                          <div className="text-sm font-medium">{t.time}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
