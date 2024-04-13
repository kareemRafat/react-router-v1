/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children , user}) => {

    if (!user) {
        toast.error('you are not allowed to visit page' , {id: 'clipboard'})
        return <Navigate to="/"/>
    }

    return ( children );
}
 
export default ProtectedRoute;