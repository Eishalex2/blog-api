import Header from "./header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Comments from "./comments";

const Detail = ({ posts }) => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://blog-api-eishalex.fly.dev/api/posts/${postId}/comments`)
      .then(response => response.json())
      .then(data => setComments(data))
  }, [postId]);

  return (
    <>
      <Header />
      {posts.filter((post) => post._id === postId)
      .map((post) => {
        return (
          <div key={post._id} className="post">
            <h1>{post.title}</h1>
            <h2>{post.timestamp}</h2>
            <p>{post.content}</p>
          </div>
        )
      })}
      <Comments comments={comments} />
    </>
  )
}

export default Detail;