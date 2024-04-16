import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ViewDetailPage from './pages/ViewDetailPage';
import ProfilePage from './pages/ProfilePage';
import Index from './pages/Index';

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
        path: "/detail",
        element: <ViewDetailPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ]
  },
  
])

export default Router