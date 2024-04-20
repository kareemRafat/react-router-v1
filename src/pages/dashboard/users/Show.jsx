import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Show = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const result = async () => {
      try {
        let { data } = await axios.get(
          `http://localhost:3000/users/${id}`
        );
        setUser(data);
      } catch (e) {
        navigate("/dashboard/users");
      }
    };
    result();
  }, [id, navigate]);

  return (
    <div className="card">
      <div className="card-header">{user.id}</div>
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">{user.address?.street}</p>
        <p className="card-text">{user.company?.name}</p>
        <Link to="/dashboard/users" className="btn btn-warning btn-sm">
          back
        </Link>
      </div>
    </div>
  );
};

export default Show;
