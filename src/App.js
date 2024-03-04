import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import MainLayout from './layout/MainLayout';
import Projects from './Pages/Projects';
import Login from './Pages/Login';
import './assets/styles/global.css'
import { useEffect } from 'react';
import Home from './Pages/Home';
import ProjectDetail from './Pages/ProjectDetail';
import ProjectsAdd from './Pages/ProjectAdd';
import ProjectEdit from './Pages/ProjectEdit';
import Categories from './Pages/Categories';
import MainProjects from './Pages/MainProjects';
import SearchItem from './Pages/SearchItem';
import Jenres from './Pages/Jenres';
import Roles from './Pages/Roles';
import Users from './Pages/Users';
import AgeCategory from './Pages/AgeCategory';
import ProjectAddStep2 from './Pages/ProjectAddStep2';
import ProjectAddStep3 from './Pages/ProjectAddStep3';

function App() {
  const router=createBrowserRouter([
    {
      	path: "/login",
		element: <Login/>,
    },
    {
      	path: "*",
      	element: <h1>404 ERROR</h1>
    },
	{
		path: "/",
		element: <Home/>
	},
    {
      element: <MainLayout/>,
      children: [
        {
			path: "/projects",
			element: <Projects/>,
		},
		{
			path: "/projects/add",
			element: <ProjectsAdd/>
		},
		{
			path: "/projects/add/:idMovie/step2",
			element: <ProjectAddStep2/>
		},
		{
			path: "/projects/add/:idMovie/step3",
			element: <ProjectAddStep3/>
		},
		{
			path: "/projects/:projectId/edit",
			element: <ProjectEdit/>
		},
		{
			path: "/projects/:projectId",
			element: <ProjectDetail/>,
		},
        {
			path: "/movies-main",
			element: <MainProjects/>
		},  
	   {
			path: "/categories",
			element: <Categories/>,
		},
        {
			path: "/roles",
			element: <Roles/>,
		},
        {
			path: "/users",
			element: <Users/>,
		},        
        {
			path: "/jenres",
			element: <Jenres/>,
		},
        {
			path: "/category-ages",
			element: <AgeCategory/>
		},
		{
			path: "/search/:searchWord",
			element: <SearchItem/>
		}
      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
				position="bottom-left"
				autoClose={3000}
				closeOnClick
				draggable
				pauseOnHover
			/>
    </div>
  );
}

export default App;
