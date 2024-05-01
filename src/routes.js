import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClassProjectPage from './pages/ClassProjectPage';
import ThesisPage from './pages/ThesisPage';
import ClassProjectViewDetailPage from './pages/ClassProjectViewDetailPage';
import ThesisViewDetailPage from './pages/ThesisViewDetailPage';
import ProfilePage from './pages/ProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import Index from './pages/Index';
import Test from './pages/Test';
import LogInPage from './pages/LogInPage';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import ManageClassProject from './pages/dashboard/ManageClassProject';
import FeaturedProject from './pages/dashboard/FeaturedProject';
import ClassProject from './pages/dashboard/ClassProject';
import ManageFeaturedClassProject from './pages/dashboard/ManageFeaturedClassProject';
import ManageThesis from './pages/dashboard/ManageThesis';
import ManageFeaturedThesis from './pages/dashboard/ManageFeaturedThesis';

import TeacherDashboard2 from './pages/dashboard/test/TeacherDashboard2';
import TeacherDashboard2CP from './pages/dashboard/test/TeacherDashboard2CP';
import TeacherDashboard2T from './pages/dashboard/test/TeacherDashboard2T';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children:[
      {
        path: "/home",
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
        path: "/teacherDashboard2",
        element: <TeacherDashboard2 />,
      },
      {
        path: "/teacherDashboard2/classProject",
        element: <TeacherDashboard2CP />,
      },
      {
        path: "/teacherDashboard2/thesis",
        element: <TeacherDashboard2T />,
      },
      {
        path: "/teacherDashboard/manageFeaturedProject",
        element: <FeaturedProject />,
      },
      {
        path: "/teacherDashboard/manageFeaturedProject/:classProjectCategoryId",
        element: <ManageFeaturedClassProject />,
      },
      {
        path: "/teacherDashboard/manageProject",
        element: <ClassProject />,
      },
      {
        path: "/teacherDashboard/manageProject/:classProjectCategoryId",
        element: <ManageClassProject />,
      },
      {
        path: "/teacherDashboard/manageThesis",
        element: <ManageThesis />,
      },
      {
        path: "/teacherDashboard/manageFeaturedThesis",
        element: <ManageFeaturedThesis />,
      },
    ]
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
])

export default Router