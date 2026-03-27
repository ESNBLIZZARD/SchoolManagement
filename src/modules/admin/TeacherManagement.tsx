import { useState } from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, MoreHorizontal, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave';
  joinDate: string;
}

const teachers: Teacher[] = [
  { id: '1', name: 'Prof. Smith', subject: 'Mathematics', email: 'smith@school.com', phone: '+1 234 567 801', status: 'Active', joinDate: '2022-08-15' },
  { id: '2', name: 'Dr. Johnson', subject: 'Physics', email: 'johnson@school.com', phone: '+1 234 567 802', status: 'Active', joinDate: '2021-01-10' },
  { id: '3', name: 'Ms. Williams', subject: 'English', email: 'williams@school.com', phone: '+1 234 567 803', status: 'On Leave', joinDate: '2023-03-20' },
  { id: '4', name: 'Mr. Brown', subject: 'History', email: 'brown@school.com', phone: '+1 234 567 804', status: 'Active', joinDate: '2020-11-05' },
];

export default function TeacherManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Teacher Management</h1>
          <p className="text-muted-foreground">Manage school faculty, subjects, and roles.</p>
        </div>
        <Button className="gap-2" noAnimation>
          <Plus className="w-4 h-4" /> Add New Teacher
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search by name or subject..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        data={filteredTeachers}
        columns={[
          { 
            header: 'Teacher', 
            accessor: (item) => (
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{item.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.subject}</div>
                </div>
              </div>
            ) 
          },
          { 
            header: 'Contact', 
            accessor: (item) => (
              <div className="space-y-1">
                <div className="text-xs flex items-center gap-1 text-muted-foreground"><Mail className="w-3 h-3" /> {item.email}</div>
                <div className="text-xs flex items-center gap-1 text-muted-foreground"><Phone className="w-3 h-3" /> {item.phone}</div>
              </div>
            ) 
          },
          { header: 'Join Date', accessor: 'joinDate' },
          { 
            header: 'Status', 
            accessor: (item) => (
              <Badge variant={item.status === 'Active' ? 'secondary' : 'outline'} className={item.status === 'Active' ? 'bg-green-100 text-green-700' : ''}>
                {item.status}
              </Badge>
            )
          },
          {
            header: 'Actions',
            accessor: () => (
              <Button variant="ghost" size="icon" noAnimation>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            )
          }
        ]}
      />
    </div>
  );
}
