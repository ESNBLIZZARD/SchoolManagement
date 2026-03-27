import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, CheckCircle2 } from 'lucide-react';

const todaySchedule = [
  { id: '1', subject: 'Mathematics', class: '10-A', time: '09:00 AM - 10:00 AM', room: 'Room 102' },
  { id: '2', subject: 'Physics', class: '11-B', time: '10:15 AM - 11:15 AM', room: 'Lab 1' },
  { id: '3', subject: 'Mathematics', class: '9-C', time: '11:30 AM - 12:30 PM', room: 'Room 204' },
  { id: '4', subject: 'Calculus', class: '12-A', time: '01:30 PM - 02:30 PM', room: 'Room 301' },
];

const pendingTasks = [
  { id: '1', task: 'Submit Grade 10 Attendance', priority: 'High' },
  { id: '2', task: 'Enter Physics Lab Results', priority: 'Medium' },
  { id: '3', task: 'Prepare Lesson Plan for Calculus', priority: 'Low' },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <div className="text-sm text-muted-foreground">Welcome back, Prof. Smith!</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> Today's Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todaySchedule.map((item) => (
              <Card key={item.id} className="hover:border-primary transition-colors cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{item.class}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.time}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{item.subject}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {item.room}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pending Tasks & Quick Stats */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" /> Pending Tasks
            </h2>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-sm font-medium">{task.task}</div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    task.priority === 'High' ? 'bg-red-100 text-red-700' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" /> Quick Stats
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Students</span>
                  <span className="font-bold">142</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Attendance</span>
                  <span className="font-bold text-green-600">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Classes Today</span>
                  <span className="font-bold">4</span>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
