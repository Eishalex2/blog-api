import { useState } from "react";
import { useParams } from "react-router-dom";

const AddComment = () => {
  const { postId } = useParams();

  const [name, setName] = useState();
  const [content, setContent] = useState();

  return (
    <div className="commentAdd">
      <form action={`https://blog-api-eishalex.fly.dev/api/posts/${postId}/comments`} method="POST">
        <div className="form-group">
          <label htmlFor=""></label>
        </div>
      </form>
    </div>
  )

}