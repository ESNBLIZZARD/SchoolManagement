import { useState } from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import { students } from '@/lib/mockData';

export default function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.rollNo.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">Manage and view all students in the school.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Add New Student
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or roll number..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      <DataTable
        data={filteredStudents}
        columns={[
          { header: 'Roll No', accessor: 'rollNo', className: 'w-[100px]' },
          { header: 'Name', accessor: 'name' },
          { header: 'Class', accessor: 'class' },
          { header: 'Parent Name', accessor: 'parentName' },
          { header: 'Contact', accessor: 'contact' },
          { 
            header: 'Status', 
            accessor: (item) => (
              <Badge variant={item.status === 'Active' ? 'secondary' : 'outline'} className={item.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                {item.status}
              </Badge>
            )
          },
          {
            header: 'Actions',
            accessor: () => (
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            )
          }
        ]}
      />
    </div>
  );
}
