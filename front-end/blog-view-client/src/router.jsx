import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from './components/index';

const Router = () => {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Index />
    }
  ])
  return <RouterProvider router={router} />
}

export default Router;