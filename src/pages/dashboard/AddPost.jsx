import Joi from "joi";
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

  // joi schema
  const schema = Joi.object({
    title : Joi.string().required() ,
    body : Joi.string().min(10).required()
  })


  // validate
  const validate = () => {
    const errors = {}
    const myForm = {...form}
    delete myForm.errors // delete errors from the form state to avoid validation for errors
    let result = schema.validate(myForm  , { abortEarly  : false })
    
    if (result.error) {
      for (const error of result.error.details) {
        errors[error.path] = error.message
      }
      setForm({...form , errors})
      return true ;
    } else {
      setForm({...form , errors : {}})
      return ;
    }
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
