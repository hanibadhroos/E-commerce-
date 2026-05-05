import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "../context/ModalContext";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import Toast from "./Toast";

export default function RegisterForm({onShowToast}){

    const {openModal} = useModal();

    const {t} = useTranslation();

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone_num, setPhone_num] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    // const [toastMessage, setToastMessage] = useState(null);
    // const [toastType, setToastType] = useState("success");


    const { loading, error } = useSelector((state) => state.auth);

    const handleOpenLogin = ()=>{
        openModal(<LoginForm/>, t("login"));
    }
    
    const handleRegister = async (e) => {
        e.preventDefault();

        try{
            await dispatch(registerUser({ name, email, password, address, phone_num })).unwrap();
            setSuccessMessage(t("Register success"));
            // setToastType("success");

            // closeModal();
            onShowToast(t("login success"), "success");
        }
        catch(e){
            // setToastMessage(t("register_failed") || "Register failed");
            // setToastType("error");
  
            onShowToast(t("register failed") || "Register failed", "error");
        }
    };
      
    return(
        <div>
            <form onSubmit={handleRegister} style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name"  value={name} onChange={(e)=>{setName(e.target.value)}}/>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                <label htmlFor="address">Address:</label>
                <input type="text" id="address" value={address} onChange={(e)=>{
                    setAddress(e.target.value)
                }}/>

                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" value={phone_num} onChange={(e)=>{setPhone_num(e.target.value)}}/>

                {successMessage && (
                    <p style={{ color: "green" }}>{successMessage}</p>
                )}

                
                <p style={{ color: "red" }}>
                    {typeof error === "string" ? error : error?.message}
                </p>

                <div className="p-2">
                    <button className="btn btn-primary m-2">{loading ? "Loading..." : "Register"}</button>
                    <button type="button" className="btn btn-info" onClick={handleOpenLogin}>{t("already_have_account")}</button>
                </div>
            </form>
        </div>
    )
}