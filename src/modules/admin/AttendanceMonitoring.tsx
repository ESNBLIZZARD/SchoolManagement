import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DataTable } from '@/components/shared/DataTable';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const attendanceStats = [
  { name: 'Present', value: 850, color: '#10b981' },
  { name: 'Absent', value: 45, color: '#ef4444' },
  { name: 'Late', value: 32, color: '#f59e0b' },
];

const classAttendance = [
  { class: '10-A', present: '94%', absent: '2%', late: '4%', status: 'Good' },
  { class: '11-B', present: '88%', absent: '8%', late: '4%', status: 'Average' },
  { class: '9-C', present: '92%', absent: '5%', late: '3%', status: 'Good' },
  { class: '12-A', present: '85%', absent: '10%', late: '5%', status: 'Warning' },
  { class: '8-B', present: '96%', absent: '1%', late: '3%', status: 'Excellent' },
];

export default function AttendanceMonitoring() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Attendance Monitoring</h1>
          <p className="text-muted-foreground">View school-wide attendance trends and daily reports.</p>
        </div>
        <input 
          type="date" 
          className="px-4 py-2 border rounded-md text-sm"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Today's Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Class-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={classAttendance}
              columns={[
                { header: 'Class', accessor: 'class' },
                { 
                  header: 'Present', 
                  accessor: (item) => <span className="text-green-600 font-medium">{item.present}</span> 
                },
                { 
                  header: 'Absent', 
                  accessor: (item) => <span className="text-red-600 font-medium">{item.absent}</span> 
                },
                { header: 'Late', accessor: 'late' },
                { 
                  header: 'Status', 
                  accessor: (item) => (
                    <Badge variant={item.status === 'Excellent' || item.status === 'Good' ? 'secondary' : 'outline'} className={
                      item.status === 'Excellent' ? 'bg-green-100 text-green-700' :
                      item.status === 'Good' ? 'bg-blue-100 text-blue-700' :
                      item.status === 'Warning' ? 'bg-red-100 text-red-700' : ''
                    }>
                      {item.status}
                    </Badge>
                  ) 
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Missing Attendance Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 flex items-center justify-between">
            <div>
              <strong>Attention:</strong> 3 classes have not submitted their attendance for today.
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-white">Class 7-A</Badge>
              <Badge variant="outline" className="bg-white">Class 10-C</Badge>
              <Badge variant="outline" className="bg-white">Class 12-B</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
