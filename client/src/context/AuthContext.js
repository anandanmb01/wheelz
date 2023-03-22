import React from "react";
import { createContext,useState } from "react";

const AuthContext = createContext({});

function AuthProvider({children}){

    const [authStatus,setAuthStatus] = useState(true);


    return(<AuthContext.Provider value={{authStatus,setAuthStatus}}>{children}</AuthContext.Provider>)
}

export {AuthContext,AuthProvider};