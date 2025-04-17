import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './Layout/AppLayout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/dashboard', element: <Dashboard /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);

const App = () => {
  return (
    
    <div className="bg-black h-screen text-white">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
