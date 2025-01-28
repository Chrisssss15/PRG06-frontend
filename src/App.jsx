// import { useState } from 'react'
import React, {useState, useEffect} from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

import {createBrowserRouter, RouterProvider} from 'react-router';
import Main from "./assets/components/page/Main.jsx";
import Layout from "./assets/components/Layout.jsx";
import Detail from "./assets/components/page/Detail.jsx";
import EditToken from "./assets/components/page/Edit.jsx";
import Create from "./assets/components/page/Create.jsx";
import NotFound from "./assets/components/page/NotFound.jsx";



const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Main/>,
            },
            {
                path: '/create',
                element: <Create/>,
            },
            {
                path: '/details/:id',
                element: <Detail/>,
            },
            {
                path: '/edit/:id',
                element: <EditToken/>,
            },
            {
                path: '*',
                element: <NotFound /> // Catch-all route for 404
            },

        ]
    }
]);

function App() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-7xl">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;
