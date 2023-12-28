import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./headers";
import Login from "./logins";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          index: true,
          element: <Login />
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default Router;