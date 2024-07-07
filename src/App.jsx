import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RouterProvider } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Router from './routes';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const client = new ApolloClient({
    link: createUploadLink({
      uri: process.env.REACT_APP_GRAPHQL,
      headers: {
        Authorization: token,
      },
    }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {/* <React.StrictMode> */}
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <RouterProvider router={Router} />
        </NextThemesProvider>
      </NextUIProvider>
      {/* </React.StrictMode> */}
    </ApolloProvider>
  );
}

export default App;
