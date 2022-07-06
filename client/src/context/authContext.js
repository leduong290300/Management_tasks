import { authReducer } from "../reducer/authReducer";
import axios from "axios";
import { createContext, useReducer, useEffect } from "react";
import { apiUrl } from "../config/connectServer";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  //*Init data
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: false,
    isAuthenticated: false,
    user: null,
  });

  const authContextData = { authState };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
