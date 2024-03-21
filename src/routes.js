import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ViewDetail from './pages/ViewDetailPage';
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
        element: <ViewDetail />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ]
  },
  
])

export default Router