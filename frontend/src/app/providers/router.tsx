import { CircleHelp } from 'lucide-react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { MainLayout } from '@/components/layout/MainLayout'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminInvitationFormPage } from '@/pages/admin/AdminInvitationFormPage'
import { AdminInvitationsPage } from '@/pages/admin/AdminInvitationsPage'
import { AdminPatientDetailPage } from '@/pages/admin/AdminPatientDetailPage'
import { AdminPatientsPage } from '@/pages/admin/AdminPatientsPage'
import { AdminProfilePage } from '@/pages/admin/AdminProfilePage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { ComingSoonPage } from '@/pages/home/ComingSoonPage'
import { HistoryPage } from '@/pages/history/HistoryPage'
import { HomePage } from '@/pages/home/HomePage'
import { InvitationDetailPage } from '@/pages/invitations/InvitationDetailPage'
import { InvitationsPage } from '@/pages/invitations/InvitationsPage'
import { MoodPage } from '@/pages/mood/MoodPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/profile/ProfilePage'
import { SymptomsPage } from '@/pages/symptoms/SymptomsPage'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { PublicOnlyRoute } from '@/routes/PublicOnlyRoute'
import { RootRedirect } from '@/routes/RootRedirect'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['patient']} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/inicio',
            element: <HomePage />,
          },
          {
            path: '/estado-animo',
            element: <MoodPage />,
          },
          {
            path: '/sintomas',
            element: <SymptomsPage />,
          },
          {
            path: '/invitaciones',
            element: <InvitationsPage />,
          },
          {
            path: '/invitaciones/:invitationId',
            element: <InvitationDetailPage />,
          },
          {
            path: '/historial',
            element: <HistoryPage />,
          },
          {
            path: '/preguntas-frecuentes',
            element: (
              <ComingSoonPage
                icon={CircleHelp}
                title="Preguntas frecuentes"
                description="Encontraras informacion util para acompanarte durante tu proceso."
              />
            ),
          },
          {
            path: '/perfil',
            element: <ProfilePage />,
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: '/admin',
            element: <Navigate to="/admin/inicio" replace />,
          },
          {
            path: '/admin/inicio',
            element: <AdminDashboardPage />,
          },
          {
            path: '/admin/pacientes',
            element: <AdminPatientsPage />,
          },
          {
            path: '/admin/pacientes/:patientId',
            element: <AdminPatientDetailPage />,
          },
          {
            path: '/admin/invitaciones',
            element: <AdminInvitationsPage />,
          },
          {
            path: '/admin/invitaciones/nueva',
            element: <AdminInvitationFormPage />,
          },
          {
            path: '/admin/invitaciones/:invitationId/editar',
            element: <AdminInvitationFormPage />,
          },
          {
            path: '/admin/perfil',
            element: <AdminProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
