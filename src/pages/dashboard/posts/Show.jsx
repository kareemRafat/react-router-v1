import { useNavigate, useParams } from "react-router-dom";

import posts from "data/posts"; // my data array
import useTitle from "components/useTitle";

const Show = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  let post = posts.find((post) => {
    return post.id == id;
  });

  let backToPosts = () => {
    navigate("/dashboard/posts");
  };

  useTitle("post " + id);
  return (
    <>
      <h1>Post page for the post {id}</h1>

      <h2 className="mt-5">{post.title}</h2>
      <p>{post.body}</p>

      <button
        onClick={backToPosts}
        className="btn btn-warning btn-sm text-light"
      >
        back
      </button>
    </>
  );
};

export default Show;
