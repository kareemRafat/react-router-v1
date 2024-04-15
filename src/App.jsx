import { RouterProvider } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import router from "router/index.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ style : {marginTop : '10px'} }} />
      <RouterProvider router={router} />
    </>
  );
}
