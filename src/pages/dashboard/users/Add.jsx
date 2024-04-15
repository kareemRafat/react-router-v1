import axios from "axios";
import Input from "components/users/Input";
import JoiSchema from "components/users/JoiSchema";
import useTitle from "components/useTitle";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Add = () => {
  // the call of any hook must be in the parent function scope
  // not inside any function
  let navigate = useNavigate();

  useTitle("add user");

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      city: "",
    },
    company: {
      name : ""
    },
    errors: [],
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

  // add data to database
  const insert = (data) => {
    delete data.errors
    axios.post('http://localhost:3000/users' , data);
    toast.success('user added successfully');
    navigate("/dashboard/users");
  }

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // return nothing if validate == true and there`s errors otherwise insert
    return validate() || insert(user) ;
  };

  // handle change
  const handleChange = (inputNameFromChild, value) => {
    setUser((prevUser) => {
      if (inputNameFromChild === "street") {
        return {
          // clone ther previous user and add address object
          ...prevUser,
          address: {
            // clone the previous user address and add street to it
            ...prevUser.address,
            street: value,
          },
        };
      }
      if (inputNameFromChild === "city") {
        return {
           // clone ther previous user and add address object
          ...prevUser,
          address: {
            // clone the previous user address and add city to it
            ...prevUser.address,
            city: value,
          },
        };
      }
      if (inputNameFromChild === "company") {
        return {
          // clone ther previous user and add company object
          ...prevUser,
          company: {
            name: value,
          },
        };
      }
      // If inputNameFromChild doesn't match any case, return previous state
      // return prevUser;
      return {
        // clone ther previous user and add {inputNameFromChild:input.value} object
        ...prevUser,
        [inputNameFromChild]: value,
      };
    });
  };

  return (
    <>
      <h1 className="my-4">add user</h1>
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

export default Add;
