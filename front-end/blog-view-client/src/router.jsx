import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from './components/index';
import Register from "./components/register";
import Login from "./components/login";
import Detail from './components/postDetail';

const Router = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://blog-api-eishalex.fly.dev/api/posts/published")
      .then(response => response.json())
      .then(data => setPosts(data))
  }, []);

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Index posts={posts} />
    },
    {
      path:"/register",
      element: <Register />
    },
    {
      path:"/login",
      element: <Login />
    },
    {
      path:"/posts/:postId",
      element: <Detail posts={posts} />
    }
  ])
  return <RouterProvider router={router} />
}

export default Router;