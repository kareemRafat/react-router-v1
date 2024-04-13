import { NavLink, Outlet } from "react-router-dom";

export default function DashboardRoot() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-2 d-md-block d-none">
            <ul className="list-group">
              <li className="list-group-item">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li className="list-group-item">
                <NavLink to="users">users</NavLink>
              </li>
              <li className="list-group-item ">
                <NavLink to="posts">posts</NavLink>
              </li>
            </ul>
          </div>
          <div className="col">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
}
