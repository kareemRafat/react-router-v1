import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  // the call of any hook must be in the parent function scope
  // not inside any function
  let navigate = useNavigate();
  let backToPosts = () => {
    navigate("/dashboard/posts");
  };

  let [form, setForm] = useState({
    title: "",
    body: "",
    errors: {},
  });

  // validate
  const validate = () => {
    let errors = {};
    if (!form.title.trim()) errors.title = "title can`t be empty";
    if (!form.body.trim()) errors.body = "body can`t be empyt";

    // 1 -clone => ...form -- 2-edit => errors : errors -- 3-set state => setForm
    setForm({ ...form, errors });

    // return
    return Object.keys(errors).length == 0 ? null : errors;
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // return nothing if validate == true and there`s errors otherwise log(submit)
    return validate() ? "" : console.log("submit");
  };

  // handle change
  const handleChange = (event) => {
    /**
     * state must be update
     * 1- clone state =>  {...form}
     * 2- modify state => [event.target.name] : event.target.value
     * ex : username : event.target.value
     * 3- set state => setForm
     */

    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <h1 className="my-4">add post form</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="fortitle" className="form-label">
            Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="fortitle"
            aria-describedby="titleHelp"
          />
          <div id="titleHelp" className="form-text text-danger fw-bold">
            {form.errors.title}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="forbody" className="form-label">
            Body
          </label>
          <input
            name="body"
            value={form.body}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="forbody"
            aria-describedby="titleHelp"
          />
          <div id="titleHelp" className="form-text text-danger fw-bold">
            {form.errors.body}
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Submit
        </button>
      </form>
      <button
        onClick={backToPosts}
        className="btn btn-warning btn-sm text-light"
      >
        back
      </button>
    </>
  );
};

export default AddPost;
