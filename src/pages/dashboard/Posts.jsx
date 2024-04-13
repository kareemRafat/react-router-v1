import { Link } from "react-router-dom";
import  posts  from "data/posts";

export default function Posts() {
  
  return (
    <>
      <div className="d-flex justify-content-between">
        <h1>Posts page</h1>
        <Link to='add' className="btn btn-info btn-sm align-self-center text-light fw-bold">Add post</Link>
      </div>
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
