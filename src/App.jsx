import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import Router from './routes';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MjRlZjA5ODJkZWRmNjE0MjdlZWE4OSIsIm5hbWUiOiJzdHVkZW50MSBzdHVkZW50MSIsInN0dWRlbnRJZCI6ImUwMDAwMDAwMiIsImVtYWlsIjoic3R1ZGVudDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkeGVDZm9xcU9UbzF0dUFXQVNzUXdULmdRL1ZLUjBNd0FGTFd4LmtaNXA5Y1JiaGZzSDhjeGEiLCJnZW5kZXIiOiJtYWxlIiwiY29udGFjdHMiOlt7InR5cGUiOiJGYWNlYm9vayIsInZhbHVlIjoiVHkgU29waGVhcnVtIn1dLCJpbWFnZSI6IiIsInJvbGUiOiJzdHVkZW50IiwiY2xhc3NQcm9qZWN0Q2F0ZWdvcnkiOltdLCJ0YWdzIjpbXSwidXBkYXRlZF9hdCI6MCwiY3JlYXRlZF9hdCI6MTcxMzY5NjUyMTE0NCwiX192IjowfSwiaWF0IjoxNzE0MDM3MDM1LCJleHAiOjE3MTQwNzMwMzV9.BCZXki3GkiVmW_V8KYqjQ6FUahC3uq-xAT8_IYdcvvs`,
    },
  }),
  cache: new InMemoryCache(),
});
function App() {
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
