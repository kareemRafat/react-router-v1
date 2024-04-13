import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "../layouts/root";
import Home from "../pages/Home";
import About from "../pages/About";
import DashboardRoot from "../layouts/DashboardRoot";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/dashboard/Users";
import Posts from "../pages/dashboard/Posts";
import Post from "../pages/dashboard/Post";
import ProtectedRoute from "components/ProtectedRoute";

// for Protected Routes
let user = null ;
// let user = { name : 'kareem' };


// router version 6 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<h1>Not found</h1>} />
      {/* nested route */}
      <Route path="/dashboard" element={
        // wrap the layout only not all the routes
        <ProtectedRoute user={user}>
          <DashboardRoot />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:id" element={<Post />} />
      </Route>
      {/* end nested route */}
    </Route>
  )
);

export default router;

