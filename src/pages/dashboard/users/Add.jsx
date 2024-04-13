import Input from "components/Input";
import useTitle from "components/useTitle";
// import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  // the call of any hook must be in the parent function scope
  // not inside any function
  let navigate = useNavigate();
  let backToPosts = () => {
    navigate("/dashboard/posts");
  };

  useTitle("add user");

  let [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    street: "",
    city: "",
    company: "",
    errors: {},
  });

  /*
  // joi schema
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().min(10).required(),
  });

  // validate
  const validate = () => {
    const errors = {};
    const myForm = { ...form };
    delete myForm.errors; // delete errors from the form state to avoid validation for errors
    let result = schema.validate(myForm, { abortEarly: false });

    if (result.error) {
      for (const error of result.error.details) {
        errors[error.path] = error.message;
      }
      setForm({ ...form, errors });
      return true;
    } else {
      setForm({ ...form, errors: {} });
      return;
    }
  };

*/
  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // return nothing if validate == true and there`s errors otherwise log(submit)
    // return validate() ? "" : console.log("submit");
  };

  // handle change
  const handleChange = (inputNameFromChild , value) => {
    setUser({
      ...user,
      [inputNameFromChild]: value,
    });
  };

  return (
    <>
      <h1 className="my-4">add post form</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <Input user={user} inputName="name"  Change={handleChange}/>
        <Input user={user} inputName="username"  Change={handleChange}/>
        <Input user={user} inputName="email" Change={handleChange}/>
        <Input user={user} inputName="street" Change={handleChange}/>
        <Input user={user} inputName="city" Change={handleChange}/>
        <Input user={user} inputName="company" Change={handleChange}/>
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

export default Add;
