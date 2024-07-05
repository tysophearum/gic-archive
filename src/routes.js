import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClassProjectPage from './pages/ClassProjectPage';
import ThesisPage from './pages/ThesisPage';
import ClassProjectViewDetailPage from './pages/ClassProjectViewDetailPage';
import ThesisViewDetailPage from './pages/ThesisViewDetailPage';
import ProfilePage from './pages/ProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import Index from './pages/Index';
import LogInPage from './pages/LogInPage';

import TeacherDashboard from './pages/dashboard/teacher/TeacherDashboard';
import ManageUnapprovedClassProject from './pages/dashboard/teacher/ManageUnapprovedClassProject';
import ApprovedClassProject from './pages/dashboard/teacher/ApprovedClassProject';
import UnapprovedClassProject from './pages/dashboard/teacher/UnapprovedClassProject';
import ManageApprovedClassProject from './pages/dashboard/teacher/ManageApprovedClassProject';
import ManageUnapprovedThesis from './pages/dashboard/teacher/ManageUnapprovedThesis';
import ManageApprovedThesis from './pages/dashboard/teacher/ManageApprovedThesis';

import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import AllApprovedClassProject from './pages/dashboard/admin/AllApprovedClassProject';
import AllUnapprovedClassProject from './pages/dashboard/admin/AllUnapprovedClassProject';
import ManageAllUnapprovedClassProject from './pages/dashboard/admin/ManageAllUnapprovedClassProject';
import ManageAllApprovedClassProject from './pages/dashboard/admin/ManageAllApprovedClassProject';
import ManageAllApprovedThesis from './pages/dashboard/admin/ManageAllApprovedThesis';
import ManageAllUnapprovedThesis from './pages/dashboard/admin/ManageAllUnapprovedThesis';
import ManageClassProjectCategory from './pages/dashboard/admin/ManageClassProjectCategory';
import ManageThesisCategory from './pages/dashboard/admin/ManageThesisCategory';

import ManageAllStudents from './pages/dashboard/admin/ManageAllStudents';
import ManageAllTeachers from './pages/dashboard/admin/ManageAllTeachers';
import ManageAllAdmins from './pages/dashboard/admin/ManageAllAdmins';

import Test from './pages/Test';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children:[
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/classProject",
        element: <ClassProjectPage />,
      },
      {
        path: "/classProject/:classProjectId",
        element: <ClassProjectViewDetailPage />,
      },
      {
        path: "/thesis",
        element: <ThesisPage />,
      },
      {
        path: "/thesis/:thesisId",
        element: <ThesisViewDetailPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/profile/:userId",
        element: <UserProfilePage />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/teacherDashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "/teacherDashboard/manageApprovedProject",
        element: <ApprovedClassProject />,
      },
      {
        path: "/teacherDashboard/manageApprovedProject/:classProjectCategoryId",
        element: <ManageApprovedClassProject />,
      },
      {
        path: "/teacherDashboard/manageUnapprovedProject",
        element: <UnapprovedClassProject />,
      },
      {
        path: "/teacherDashboard/manageUnapprovedProject/:classProjectCategoryId",
        element: <ManageUnapprovedClassProject />,
      },
      {
        path: "/teacherDashboard/manageUnapprovedThesis",
        element: <ManageUnapprovedThesis />,
      },
      {
        path: "/teacherDashboard/manageApprovedThesis",
        element: <ManageApprovedThesis />,
      },
      {
        path: "/adminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/adminDashboard/manageApprovedProject",
        element: <AllApprovedClassProject />,
      },
      {
        path: "/adminDashboard/manageApprovedProject/:classProjectCategoryId",
        element: <ManageAllApprovedClassProject />,
      },
      {
        path: "/adminDashboard/manageUnapprovedProject",
        element: <AllUnapprovedClassProject />,
      },
      {
        path: "/adminDashboard/manageUnapprovedProject/:classProjectCategoryId",
        element: <ManageAllUnapprovedClassProject />,
      },
      {
        path: "/adminDashboard/manageApprovedThesis",
        element: <ManageAllApprovedThesis />,
      },
      {
        path: "/adminDashboard/manageUnapprovedThesis",
        element: <ManageAllUnapprovedThesis />,
      },
      {
        path: "/adminDashboard/manageProjectCategory",
        element: <ManageClassProjectCategory />,
      },
      {
        path: "/adminDashboard/manageThesisCategory",
        element: <ManageThesisCategory />,
      },
      {
        path: "/adminDashboard/manageStudents",
        element: <ManageAllStudents />,
      },
      {
        path: "/adminDashboard/manageTeachers",
        element: <ManageAllTeachers />,
      },
      {
        path: "/adminDashboard/manageAdmins",
        element: <ManageAllAdmins />,
      },
    ]
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
])

export default Router