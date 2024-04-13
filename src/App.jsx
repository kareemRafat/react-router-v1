import {
  RouterProvider
} from "react-router-dom";


import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import router from './router/index.jsx'


export default function App() {
  return (
      <RouterProvider router={router} />
  );
}

