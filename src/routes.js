import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClassProjectPage from './pages/ClassProjectPage';
import ThesisPage from './pages/ThesisPage';
import ClassProjectViewDetailPage from './pages/ClassProjectViewDetailPage';
import ThesisViewDetailPage from './pages/ThesisViewDetailPage';
import ProfilePage from './pages/ProfilePage';
import Index from './pages/Index';
import Test from './pages/Test';

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
        path: "/test",
        element: <Test />,
      },
    ]
  },
])

export default Router