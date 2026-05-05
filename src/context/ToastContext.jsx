import React, {createContext, useContext, useState } from "react";

////Create context 
const ToastContext = createContext();

//// Create Provider
export const ToastProvider = ({children}) =>{

    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast(null);
    };

    return (
        <ToastContext.Provider value={{ toast, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = ()=>{
    const context = useContext(ToastContext);

    if(!context){
        throw new Error('useToast must be used within a CartProvider')
    }

    return context;
}