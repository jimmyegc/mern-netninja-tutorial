import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {   
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  
  return authContext;
}