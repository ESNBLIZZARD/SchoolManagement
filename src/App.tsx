import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from '@/components/QueryProvider';
import { Toaster } from '@/components/ui/sonner';
import { useAuthStore } from '@/modules/auth/authStore';
import { ProtectedRoute } from '@/modules/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PublicLayout } from '@/components/PublicLayout';

// Pages (Lazy loading for performance)
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('@/modules/auth/LoginPage'));
const AdminDashboard = lazy(() => import('@/modules/admin/AdminDashboard'));
const StudentManagement = lazy(() => import('@/modules/admin/StudentManagement'));
const TeacherManagement = lazy(() => import('@/modules/admin/TeacherManagement'));
const AttendanceMonitoring = lazy(() => import('@/modules/admin/AttendanceMonitoring'));
const FinanceManagement = lazy(() => import('@/modules/admin/FinanceManagement'));
const TimetableManagement = lazy(() => import('@/modules/admin/TimetableManagement'));
const AnnouncementsManagement = lazy(() => import('@/modules/admin/AnnouncementsManagement'));
const TeacherDashboard = lazy(() => import('@/modules/teacher/TeacherDashboard'));
const TeacherTimetable = lazy(() => import('@/modules/teacher/TeacherTimetable'));
const AttendanceMarking = lazy(() => import('@/modules/teacher/AttendanceMarking'));
const ResultsEntry = lazy(() => import('@/modules/teacher/ResultsEntry'));
const PublicHome = lazy(() => import('@/modules/public/PublicHome'));
const AnnouncementsPage = lazy(() => import('@/modules/public/AnnouncementsPage'));
const HolidayList = lazy(() => import('@/modules/public/HolidayList'));
const ContactPage = lazy(() => import('@/modules/public/ContactPage'));
const StudentDiary = lazy(() => import('@/modules/public/StudentDiary'));

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <QueryProvider>
      <Router>
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><PublicHome /></PublicLayout>} />
            <Route path="/announcements" element={<PublicLayout><AnnouncementsPage /></PublicLayout>} />
            <Route path="/holidays" element={<PublicLayout><HolidayList /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/diary" element={<PublicLayout><StudentDiary /></PublicLayout>} />
            
            {/* Auth Routes */}
            <Route path="/auth/login" element={user ? <Navigate to={user.role === 'ADMIN' ? '/admin' : '/teacher'} replace /> : <LoginPage />} />

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin/*" element={
                <DashboardLayout role="ADMIN">
                  <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="students" element={<StudentManagement />} />
                    <Route path="teachers" element={<TeacherManagement />} />
                    <Route path="attendance" element={<AttendanceMonitoring />} />
                    <Route path="finance" element={<FinanceManagement />} />
                    <Route path="timetable" element={<TimetableManagement />} />
                    <Route path="announcements" element={<AnnouncementsManagement />} />
                  </Routes>
                </DashboardLayout>
              } />
            </Route>

            {/* Teacher Routes */}
            <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
              <Route path="/teacher/*" element={
                <DashboardLayout role="TEACHER">
                  <Routes>
                    <Route index element={<TeacherDashboard />} />
                    <Route path="timetable" element={<TeacherTimetable />} />
                    <Route path="attendance" element={<AttendanceMarking />} />
                    <Route path="results" element={<ResultsEntry />} />
                  </Routes>
                </DashboardLayout>
              } />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
      <Toaster />
    </QueryProvider>
  );
}

export default App;
