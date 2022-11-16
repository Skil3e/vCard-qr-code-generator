import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import { Vcard } from "./pages/vcard";
import { UrlGenerator } from "./pages/url";

const router = createBrowserRouter( [
    {
        path    : "/",
        element : <App/>,
        children: [
            {
                path   : "/",
                element: <UrlGenerator/>
            },
            {
                path   : "/v-card",
                element: <Vcard/>
            },
        ]

    },

] );

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={ router }/>
  </React.StrictMode>
)
