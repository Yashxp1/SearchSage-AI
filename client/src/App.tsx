import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './Layout/AppLayout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
      { path: '/', element: <Home /> },
    ],
  },
]);

const App = () => {
  return (
    <div className="bg-black h-screen text-white">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
