import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/auth/Login';
import Layout from './pages/dashboard/Layout';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: true ? <Layout /> : <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
