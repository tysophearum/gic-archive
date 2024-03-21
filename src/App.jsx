import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import Router from './routes';

function App() {
  return (
    <React.StrictMode>
      <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <RouterProvider router={Router} />
      </NextThemesProvider>
      </NextUIProvider>
    </React.StrictMode>
  );
}

export default App;
