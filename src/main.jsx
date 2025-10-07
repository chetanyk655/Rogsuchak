import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/homepage/homepage/HomePage.jsx";


import Diagnosis from "./pages/diagnosis/Diagnosis.jsx";
import Insights from "./pages/insights/Analysis.jsx";
import SendHistory from "./pages/history/SendHistory.jsx";
import Blog from "./pages/Blogs/Blog.jsx";
import NewPost from "./pages/Blogs/NewPost.jsx";
import BlogDetail from "./pages/Blogs/PostDetails.jsx";
import Myblog from "./pages/Blogs/myposts.jsx";
import EditPost from "./pages/Blogs/EditPost.jsx";
import AgricultureDashboard from "./pages/WorkSpace/WorkSpace.jsx";
import CaseList from "./pages/cases/CaseList.jsx";
import Solve from "./pages/solve/SDiagnosisPage.jsx";

import Faq from './pages/faq_feedback/Faq.jsx';
import { DarkModeProvider } from "./DarkModeContext.jsx";
import Layout from "./Layout.jsx";
import "./globals.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomePage></HomePage>
    ),
  },
 
  {
    path: "/home",
    element: (

        <Layout />
  
    ),
    children: [{ path: "", element: <HomePage /> }],
  },
  {
    path: "/diagnose",
    element: (
     
        <Layout />
  
    ),
    children: [{ path: "", element: <Diagnosis /> }],
  },
 
  
  {
    path: "/faq",
    element: (

        <Layout />
  
    ),
    children: [{ path: "", element: <Faq /> }],
  },
  {
    path: "/blogs",
    element: (
      
        <Layout />
    
    ),
    children: [{ path: "", element: <Blog /> }],
  },
  {
    path: "/blogs/new",
    element: (
    
        <Layout />
      
    ),
    children: [{ path: "", element: <NewPost /> }],
  },
  {
    path: "/blogs/:id",
    element: (

        <Layout />
      
    ),
    children: [{ path: "", element: <BlogDetail /> }],
  },
  {
    path: "/blogs/my",
    element: (
 
        <Layout />
    
    ),
    children: [{ path: "", element: <Myblog /> }],
  },
  {
    path: "/blogs/edit/:id",
    element: (
     
        <Layout />
    
    ),
    children: [{ path: "", element: <EditPost /> }],
  },
  {
    path: "/workspace",
    element: (
      
        <Layout />
    
    ),
    children: [{ path: "", element: <AgricultureDashboard /> }],
  },
  {
    path: "/cases",
    element: (
   
        <Layout />
    ),
    children: [{ path: "", element: <CaseList /> }],
  },
  {
    path: "/solve/:caseId",
    element: (
        <Layout />
    ),
    children: [{ path: "", element: <Solve /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <RouterProvider router={router} />
    </DarkModeProvider>
  </StrictMode>
);
