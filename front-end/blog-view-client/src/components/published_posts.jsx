import { useEffect, useState } from 'react';

const PublishedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://blog-api-eishalex.fly.dev/api/posts/published")
      .then(response => response.json())
      .then(data => setPosts(data))
  }, [])

  return (
    <div className="post">
      {posts.map(post => {
        return (
          <div key = {post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        )
      })}
    </div>
  )
}

export default PublishedPosts;