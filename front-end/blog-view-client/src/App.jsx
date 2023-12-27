import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://blog-api-eishalex.fly.dev/api/posts/published")
      .then(response => response.json())
      .then(data => setPosts(data))
  }, []);

  // return (
  //   <div className="post">
  //     {posts.map(post => {
  //       return (
  //         <div key = {post.id}>
  //           <h2>{post.title}</h2>
  //           <p>{post.content}</p>
  //         </div>
  //       )
  //     })}
  //   </div>
  // )
  return <Outlet context={{ posts }} />
}

export default App
