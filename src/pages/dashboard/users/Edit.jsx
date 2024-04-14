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

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      city: "",
    },
    company: "",
    errors: [],
  });

  const { id } = useParams();

  useEffect(() => {
    const result = async () => {
      try {
        let { data } = await axios.get(`http://localhost:3000/users/${id}`);
        delete data.id
        setUser({...user ,  ...data});
      } catch (e) {
        navigate("/dashboard/users");
      }
    };
    result();
  }, []);

  // joi schema
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    address: Joi.object({
      street: Joi.required(),
      city: Joi.required(),
    }),
    company: Joi.object({
      name: Joi.string().required(),
    }),
  });

  // validate
  const validate = () => {
    const errors = {};
    const myForm = { ...user };
    delete myForm.errors; // delete errors from the form state to avoid validation for errors
    delete myForm.id; // delete errors from the form state to avoid validation for errors

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
  // todo check the update shit
  const handleChange = (inputNameFromChild, value) => {
    setUser({
      ...user,
      [inputNameFromChild]: value,
      company : {
        name : value
      },
      address : {
        street : value ,
        city : value 
      }
    });
    console.log({[inputNameFromChild]: value});
  };

  return (
    <>
      <h1 className="my-4">Edit user {user.id}</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <Input
          value={user.name}
          inputName="name"
          errors={user.errors}
          onChange={handleChange}
        />
        <Input
          value={user.username}
          inputName="username"
          errors={user.errors}
          onChange={handleChange}
        />
        <Input
          value={user.email}
          inputName="email"
          errors={user.errors}
          onChange={handleChange}
        />
        <Input
          value={user.address.street}
          inputName="address"
          errors={user.errors}
          onChange={handleChange}
        />
        <Input
          value={user.address.city }
          inputName="address"
          errors={user.errors}
          onChange={handleChange}
        />
        <Input
          value={user.company.name }
          inputName="company"
          errors={user.errors}
          onChange={handleChange}
        />
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
