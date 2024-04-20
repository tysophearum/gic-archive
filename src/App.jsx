import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import Router from './routes';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MTNiZTNiMmVmZmNhODY1YmY1M2MxMyIsImZpcnN0TmFtZSI6IlN0dWRlbnQyIiwibGFzdE5hbWUiOiJTdHVkZW50MiIsImVtYWlsIjoic3R1ZGVudDJAZ21haWwuY29tIiwiZ2VuZGVyIjoibWFsZSIsInBhc3N3b3JkIjoiJDJiJDEwJFpjZjkwSlBNRmVnMWtvZ1h5OC9jdk9mN0dpQnNVWkVNTkVWcVNjRTFqbnUvZFZDNzh4VnFTIiwiY29udGFjdHMiOlt7InR5cGUiOiJGYWNlYm9vayIsInZhbHVlIjoiU3R1ZGVudDIifV0sImltYWdlIjoiIiwicm9sZSI6InN0dWRlbnQiLCJjbGFzc1Byb2plY3RDYXRlZ29yeSI6W10sInVwZGF0ZWRfYXQiOjAsImNyZWF0ZWRfYXQiOjE3MTI1Njk5MTUyMDcsIl9fdiI6MH0sImlhdCI6MTcxMzUxNzMwNCwiZXhwIjoxNzEzNTUzMzA0fQ.Bg9AKN1n8oom3BBmfCBoMmA1Lo6H-q5NppE8iKqIIjE`,
    },
  }),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
    <React.StrictMode>
      <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <RouterProvider router={Router} />
      </NextThemesProvider>
      </NextUIProvider>
    </React.StrictMode>

    </ApolloProvider>
  );
}

export default App;
