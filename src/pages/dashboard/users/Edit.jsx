/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Input from "components/Input";
import useTitle from "components/useTitle";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  // the call of any hook must be in the parent function scope
  // not inside any function
  let navigate = useNavigate();
  let backToPosts = () => {
    navigate("/dashboard/posts");
  };

  useTitle("Edit user");

  let [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address : {
        street: "",
        city: "",
    },
    company: "",
    errors: {},
  });

  const { id } = useParams();

  // edit if id 
  useEffect(()=> {
    const result = async()=>{
        let { data } = await axios.get(`http://localhost:3000/users/${id}`)
        setUser({
            ...user , 
            ...data
        })
    }
    result();
  } , [])

  // joi schema
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email({tlds:{allow: false}}).required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    company: Joi.string().required(),
  });

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
        <Input value={user.name} inputName="name"  errors={user.errors} Change={handleChange}/>
        <Input value={user.username} inputName="username"  errors={user.errors} Change={handleChange}/>
        <Input value={user.email} inputName="email" errors={user.errors} Change={handleChange}/>
        <Input value={user.address.street} inputName="street" errors={user.errors} Change={handleChange}/>
        <Input value={user.address.city} inputName="city" errors={user.errors} Change={handleChange}/>
        <Input value={user.company.name} inputName="company" errors={user.errors} Change={handleChange}/>
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

export default Edit;
