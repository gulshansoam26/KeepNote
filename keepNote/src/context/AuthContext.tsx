import { createContext, ReactNode, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
// import { authReducer, initialLoggedState} from "../reducers/AuthReducer";
import { RootActions, rootReducer, RootState } from "../reducers/RootReducers";
import {initialRootState} from "../reducers/RootReducers";

interface AuthContextType {
    login:()=>void ;
    logout: ()=>void;
    isLoggedIn:boolean;
    rootState: RootState;
    rootDispatch : React.Dispatch<RootActions>
}


const AuthContext = createContext<AuthContextType |undefined>(undefined);

export const AuthProvider = ({children}:{children:ReactNode})=> {
    const navigate = useNavigate();

    // const [loggedState, dispatch] = useReducer(authReducer,initialLoggedState)

    const [rootState,rootDispatch] = useReducer(rootReducer,initialRootState);

   useEffect(() => {
    localStorage.setItem("isLoggedIn", String(rootState.auth.isLoggedIn));
  }, [rootState.auth.isLoggedIn]);


  const login = () => {
    rootDispatch({type:"LOGIN"});
    navigate("/home"); // default after login
  };
  
  const logout = () => {
    rootDispatch({type:"LOGOUT"})

  console.log("logout clicked");
    localStorage.removeItem("userId");
    navigate("/login");
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn:rootState.auth.isLoggedIn, login, logout ,rootDispatch,rootState}}>
      {children}
    </AuthContext.Provider>
  );

}
export default AuthContext;