import { RouterProvider } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import router from "router/index.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ style : {marginTop : '50px'} }} />
      <RouterProvider router={router} />
    </>
  );
}
