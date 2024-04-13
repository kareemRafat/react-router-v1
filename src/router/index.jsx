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
import Users from "../pages/dashboard/users/Index";
import Posts from "../pages/dashboard/posts/Index";
import Post from "../pages/dashboard/posts/Show";
import ProtectedRoute from "components/ProtectedRoute";
import AddPost from "pages/dashboard/posts/Add";
import Add from "pages/dashboard/users/Add";

// for Protected Routes
// let user = null ;
let user = { name : 'kareem' };


// router version 6 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<h1>Not found</h1>} />
      {/* nested route */}
      <Route path="/dashboard" element={
        // wrap the layout component only not all the routes
        <ProtectedRoute user={user}>
          <DashboardRoot />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="users/add" element={<Add />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:id" element={<Post />} />
        <Route path="posts/add" element={<AddPost />} />
      </Route>
      {/* end nested route */}
    </Route>
  )
);

export default router;

