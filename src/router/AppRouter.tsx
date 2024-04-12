import { Home } from '@/views/home/Home';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/hooks';
import { Layout } from '@/views/layout';
/* Rutas */
import { DashboardView } from '@/views/admin/dashboard';
import { PermissionView } from '@/views/admin/permission';
import { RoleView } from '@/views/admin/role';
import { StaffView } from '@/views/admin/staff';
import { GuestView } from '@/views/admin/guest';
import { CalendarView } from '@/views/admin/calendar';
import { ReportView } from '@/views/admin/report';
import { SpeakerView } from '@/views/admin/speaker';
import { AuthCustomer } from '@/views/home/auth/customer/Auth';
import { LoginAdmin } from '@/views/home/auth/admin/Login';
import { Profile } from '@/views/customer/Profile';
import { Navbar } from '@/views/home';
import { Footer } from '@/views/home/footer';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  switch (status) {
    case 'not-authenticated':
      return (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthCustomer />} />
            <Route path="/admin" element={<LoginAdmin />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
          </Routes>
          <Footer />
        </>
      );
    case 'authenticatedCustomer':
      return (
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Navigate to={'/profile'} />} />
        </Routes>
      );
    default:
      return (
        <Layout>
          <Routes>
            <Route path="/dashboardView" element={<DashboardView />} />
            <Route path="/permissionsView" element={<PermissionView />} />
            <Route path="/rolesView" element={<RoleView />} />
            <Route path="/staffView" element={<StaffView />} />
            <Route path="/guestView" element={<GuestView />} />
            <Route path="/speakerView" element={<SpeakerView />} />
            <Route path="/calendarView" element={<CalendarView />} />
            <Route path="/reportView" element={<ReportView />} />
            <Route path="/*" element={<Navigate to={'/dashboardView'} />} />
          </Routes>
        </Layout>
      );
  }
};
