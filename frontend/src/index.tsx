import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
// import App from './App';
import HomePage from './views/Home';
import GroupLayout from './views/Group';
import SuggestPage from './views/Suggest';
import { MantineProvider } from '@mantine/core';
import ManagePage from './views/Manage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/group",
    element: <GroupLayout></GroupLayout>,
    children: [
      {
        path: 'suggest',
        element: <SuggestPage></SuggestPage>
      },
      {
        path: 'manage',
        element: <ManagePage></ManagePage>
      }
    ]
  }
]);

root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark'}}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
