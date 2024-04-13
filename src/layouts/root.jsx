import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Root() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Root;
