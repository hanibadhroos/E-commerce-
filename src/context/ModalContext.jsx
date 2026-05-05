import React, {createContext, useContext, useState} from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({children})=>{
    const [modal, setModal] = useState({
        isOpen: false,
        title: null,
        content: ''
    });

    const openModal = (content, title='')=>{
        setModal({
            isOpen:true,
            content,
            title
        });
    }

    const closeModal = ()=>{
        setModal({
            isOpen:false,
            title:'',
            content:null
        });
    }

    return(
        <ModalContext.Provider value={{modal, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}