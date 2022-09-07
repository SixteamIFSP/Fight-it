import React, { useContext, useState, useRef } from "react";
import { ConfirmModal } from "../components/FigthItModal";

const ModalContext = React.createContext();

const ModalProvider = ({children}) => {
    const [visible, setVisible] = useState(false);
    const [textModal, setTextModal] = useState('');
    const callback = useRef(()=>{console.log('funcionado!!');})

    const  changeModal = () =>{
        setVisible(current => !current)
    }

    const confirmAction =()=>{
        callback.current();
        changeModal()
    }

    function setCallback(text, funcCallBack){
        setTextModal(text);
        callback.current = funcCallBack;

    }
    return (
        <ModalContext.Provider value={{changeModal, setCallback }}>
            <ConfirmModal value={visible} changeModal={changeModal} textModal={textModal} confirmAction={confirmAction} /> 
            {children}
        </ModalContext.Provider>
    )
}

function useModal(){
    const context = useContext(ModalContext);
    return context;
}

export { ModalProvider, useModal }

