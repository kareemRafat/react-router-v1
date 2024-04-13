/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import useTitle from "components/useTitle";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  useTitle("users");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost:3000/users");
      setUsers(data);
    }

    fetchData();
  }, []);
  // dependancy array empty because this will happen once - component amount

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
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.street}</td>
                <td>{user.address.city}</td>
                <td>{user.company.name}</td>
                <td>
                  <div className="btn btn-group">
                    <button className="btn btn-primary btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
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
