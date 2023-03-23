import React from "react";
import { createContext,useState } from "react";

const NotificationPropContext = createContext({});

function NotificationPropProvider({children}){

    const [notificationProp,setNotificationProp] = useState({
        open_:false,
        severity:'success',
        message:'Notification component',
    });


    return(<NotificationPropContext.Provider value={{notificationProp,setNotificationProp}}>{children}</NotificationPropContext.Provider>)
}

export {NotificationPropContext,NotificationPropProvider};