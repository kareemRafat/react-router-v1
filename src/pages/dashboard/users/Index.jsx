/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import useTitle from "components/useTitle";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Index() {
  useTitle("users");
  let incId = 0 ;

  const [users, setUsers] = useState([]);

  // fetch the users from json.db json-server
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost:3000/users");
      setUsers(data);
    }

    fetchData();
  }, []);
  // dependancy array empty because this will happen once - component amount

  // delete user 
  const deleteUser = (id) => {
    // update ui by modifing the state
    setUsers(users.filter(user => user.id !== id ))

    // update database

    toast.success('user deleted successfully' , {
      style : {
        marginTop : '5px'
      }
    })
  }

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <h1>Users Page</h1>
          <Link to="add" className="btn btn-info btn-sm align-self-center text-light fw-bold">add user</Link>
        </div>
      </div>
      <table className="table table-hover table-bordered table-striped mt-4 table-sm">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>username</th>
            <th>email</th>
            <th>street</th>
            <th>city</th>
            <th>company</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>

          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{++incId}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.street}</td>
                <td>{user.address.city}</td>
                <td>{user.company.name}</td>
                <td>
                  <div className="btn btn-group">
                    <Link to={`${user.id}/edit`} className="btn btn-primary btn-sm">Edit</Link>
                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
