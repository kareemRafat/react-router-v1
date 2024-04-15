/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Input from "components/users/Input";
import JoiSchema from "components/users/JoiSchema";
import useTitle from "components/useTitle";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  // the call of any hook must be in the parent function scope
  // not inside any function
  let navigate = useNavigate();

  useTitle("Edit user");

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      city: "",
    },
    company: {
      name: "",
    },
    errors: [],
  });

  const { id } = useParams();

  useEffect(() => {
    const result = async () => {
      try {
        let { data } = await axios.get(`http://localhost:3000/users/${id}`);
        delete data.id;
        setUser({ ...user, ...data });
      } catch (e) {
        navigate("/dashboard/users");
      }
    };
    result();
  }, []);

  // joi schema
  const schema = JoiSchema;

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

  // update data to database
  const update = (data) => {
    delete data.errors;
    axios.patch("http://localhost:3000/users/" + id, data);
    toast.success("user updated successfully" , { duration : 5000});
    navigate("/dashboard/users");
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // return nothing if validate == true and there`s errors otherwise update
    return validate() || update(user);
  };

  // Update user state based on input
  const handleChange = (inputNameFromChild, value) => {
    setUser((prevUser) => {
      if (inputNameFromChild === "street") {
        return {
          ...prevUser,
          address: {
            ...prevUser.address,
            street: value,
          },
        };
      }
      if (inputNameFromChild === "city") {
        return {
          ...prevUser,
          address: {
            ...prevUser.address,
            city: value,
          },
        };
      }
      if (inputNameFromChild === "company") {
        return {
          ...prevUser,
          company: {
            name: value,
          },
        };
      }
      // If inputNameFromChild doesn't match any case, return previous state
      // return prevUser;
      return {
        ...prevUser,
        [inputNameFromChild]: value,
      };
    });
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
          inputName="street"
          errors={user.errors}
          onChange={handleChange}
        />
        <Input
          value={user.address.city}
          inputName="city"
          errors={user.errors}
          onChange={handleChange}
        />
        <Input
          value={user.company.name}
          inputName="company"
          errors={user.errors}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary btn-sm">
          Submit
        </button>
      </form>
      <button
        onClick={() => navigate("/dashboard/users")}
        className="btn btn-warning btn-sm text-light"
      >
        back
      </button>
    </>
  );
};

export default Edit;
