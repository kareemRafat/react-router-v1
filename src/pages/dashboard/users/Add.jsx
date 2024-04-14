import Input from "components/users/Input";
import JoiSchema from "components/users/JoiSchema";
import useTitle from "components/useTitle";
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

  // joi schema
  const schema = JoiSchema;

  // validate
  const validate = () => {
    const errors = {};
    const myForm = { ...user };
    delete myForm.errors; // delete errors from the form state to avoid validation for errors
    let result = schema.validate(myForm, { abortEarly: false });

    if (result.error) {
      for (const error of result.error.details) {
        errors[error.path] = error.message;
      }
      setUser({ ...user, errors });
      return true;
    } else {
      setUser({ ...user, errors: {} });
      return;
    }
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // return nothing if validate == true and there`s errors otherwise log(submit)
    return validate() ? "" : console.log("submit");
  };

  // handle change
  const handleChange = (inputNameFromChild, value) => {
    setUser({
      ...user,
      [inputNameFromChild]: value,
    });
  };

  return (
    <>
      <h1 className="my-4">add user</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <Input inputName="name" errors={user.errors} Change={handleChange} />
        <Input
          inputName="username"
          errors={user.errors}
          Change={handleChange}
        />
        <Input inputName="email" errors={user.errors} Change={handleChange} />
        <Input inputName="street" errors={user.errors} Change={handleChange} />
        <Input inputName="city" errors={user.errors} Change={handleChange} />
        <Input inputName="company" errors={user.errors} Change={handleChange} />
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
