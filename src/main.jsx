import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from './App';
import Routine from './components/Routine';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path:"/routine",
    element:<Routine></Routine>,
    // loader:()=>fetch('http://localhost:5000/examInfo')
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
