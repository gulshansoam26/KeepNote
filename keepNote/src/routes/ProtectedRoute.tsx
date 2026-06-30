import { JSX, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

interface ProtectedRouteProps {
    children: JSX.Element;
}


export default function ProtectedRoute({children}:ProtectedRouteProps){
    const {isLoggedIn} = useContext(AuthContext)!;

    if(!isLoggedIn){
        return <Navigate to="/login" replace/>;
    }

    return children;
}