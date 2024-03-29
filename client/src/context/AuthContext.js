import React from "react";
import { createContext,useState } from "react";

const AuthContext = createContext({});

function AuthProvider({children}){

    const [authStatus,setAuthStatus] = useState(false);


    return(<AuthContext.Provider value={{authStatus,setAuthStatus}}>{children}</AuthContext.Provider>)
}

export {AuthContext,AuthProvider};