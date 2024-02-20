import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import Header from './components/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
// import ReactDOM from 'react-dom';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  }
])


function App() {
  return (
    <React.StrictMode>
      <NextUIProvider>
        <Header />
        <RouterProvider router={Router} />
      </NextUIProvider>
    </React.StrictMode>
  );
}

export default App;
