const Comments = ({comments}) => {
  return (
    <div className="comments-container">
      {comments.length > 0 ? (
        comments.map((comment) => {
          return (
            <div key={comment._id} className="comment">
              <p>{comment.content}</p>
            </div>
          )
        })
      ) : (
        "No comments yet"
      )}
    </div>
  )
}

export default Comments;