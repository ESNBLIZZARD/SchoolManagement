import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, TrendingDown, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 34000 },
  { month: 'Mar', revenue: 48000, expenses: 31000 },
  { month: 'Apr', revenue: 61000, expenses: 38000 },
  { month: 'May', revenue: 55000, expenses: 35000 },
  { month: 'Jun', revenue: 67000, expenses: 40000 },
];

const transactions = [
  { id: '1', student: 'John Doe', type: 'Fee Payment', amount: 500, status: 'Completed', date: '2026-03-27' },
  { id: '2', student: 'Jane Smith', type: 'Fee Payment', amount: 450, status: 'Pending', date: '2026-03-26' },
  { id: '3', type: 'School Expense', amount: 1200, status: 'Completed', date: '2026-03-25', description: 'Lab Equipment' },
  { id: '4', student: 'Mike Johnson', type: 'Fee Payment', amount: 600, status: 'Completed', date: '2026-03-24' },
  { id: '5', type: 'Salary Payment', amount: 15000, status: 'Completed', date: '2026-03-23', description: 'Teacher Salaries' },
];

export default function FinanceManagement() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Finance Management</h1>
          <p className="text-muted-foreground">Track school revenue, expenses, and student fees.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" noAnimation>
            <Download className="w-4 h-4" /> Export Report
          </Button>
          <Button className="gap-2" noAnimation>
            <DollarSign className="w-4 h-4" /> Add Transaction
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Total Revenue (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$328,000</div>
            <div className="text-xs mt-1 opacity-80 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12.5% from last year
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$210,000</div>
            <div className="text-xs mt-1 text-green-600 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> -2.4% from last year
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">$12,450</div>
            <div className="text-xs mt-1 text-muted-foreground">From 42 students</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Transactions</h2>
          <Button variant="ghost" size="sm" className="gap-2" noAnimation>
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>
        <DataTable
          data={transactions}
          columns={[
            { header: 'Date', accessor: 'date' },
            { 
              header: 'Description', 
              accessor: (item) => (
                <div>
                  <div className="font-medium">{item.type}</div>
                  <div className="text-xs text-muted-foreground">{item.student || item.description}</div>
                </div>
              ) 
            },
            { 
              header: 'Amount', 
              accessor: (item) => (
                <span className={item.type === 'Fee Payment' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {item.type === 'Fee Payment' ? '+' : '-'}${item.amount}
                </span>
              ) 
            },
            { 
              header: 'Status', 
              accessor: (item) => (
                <Badge variant={item.status === 'Completed' ? 'secondary' : 'outline'} className={item.status === 'Completed' ? 'bg-green-100 text-green-700' : ''}>
                  {item.status}
                </Badge>
              ) 
            },
          ]}
        />
      </div>
    </div>
  );
}
