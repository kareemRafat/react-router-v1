import { Link } from "react-router-dom";
import  posts  from "data/posts";

export default function Posts() {
  return (
    <>
      <h1>Posts page</h1>
      <ul className="list-group list-group-flush mt-5">
        {posts.map( post => {
            return <li key={post.id} className="list-group-item">
                <Link to={`${post.id}`}>
                    {post.title}
                </Link>
            </li>
        })}
        
      </ul>
    </>
  );
}
