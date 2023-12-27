import Header from "./header";
import styles from "../styles/index.module.css";
import { Link } from "react-router-dom";

const Index = ({ posts }) => {

  return (
    <>
      <Header />
      <div className="posts-container">
        {posts && (
          posts.map((post) => {
            return (
              <Link to={"/posts/" + post._id} key={post._id}>
                <div className={styles.post}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <p>Posted on {post.timestamp}</p>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </>
  )
}

export default Index;