/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import useTitle from "components/useTitle";
import Modal from "components/users/Modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Index() {
  useTitle("users");
  let incId = 0;

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [username , setUsername] = useState('');

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
  const deleteUser = async (id) => {
    // using optimistic update
    // 1 - first we store the old user state in variable
    // 2 - then update the ui first
    // 3 - then update or delete from the database
    // 4 - if error fires return the state to original state
    const oldUser = [...users];

    // update ui by modifing the state
    setUsers(users.filter((user) => user.id !== id));

    try {
      // update database
      await axios.delete("http://localhost:3000/users/" + id);

      toast.success("user deleted successfully");
    } catch (err) {
      toast.error("can`t delete the user");
      setUsers(oldUser);
    }
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <h1>Users Page</h1>
          <Link
            to="add"
            className="btn btn-info btn-sm align-self-center text-light fw-bold"
          >
            add user
          </Link>
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
                <td>
                  <Link to={`${user.id}`}>{user.name}</Link>
                </td>
                <td className="text-primary">{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.street}</td>
                <td>{user.address.city}</td>
                <td>{user.company.name}</td>
                <td>
                  <div className="btn btn-group">
                    <Link
                      to={`${user.id}/edit`}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => {
                        setUserId(user.id)
                        setUsername(user.username)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal name={username} id={userId} onDelete={deleteUser} />
    </>
  );
}
