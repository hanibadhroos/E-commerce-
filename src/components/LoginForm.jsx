import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchUser, login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../context/ModalContext";
import Toast from "./Toast";


export default function LoginForm({onShowToast}){

    const dispatch = useDispatch();

    const {t} = useTranslation();

    const {closeModal} = useModal();

    const { loading, error, isAuthenticated } = useSelector(
        (state) => state.auth
      );

    const [credentials, setCredentials] = useState({
        email:'',
        password: ''
    });

    const [successMessage, setSuccessMessage] = useState("");
    // const [toastMessage, setToastMessage] = useState(null);
    // const [toastType, setToastType] = useState("success");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

          await dispatch(login(credentials)).unwrap();

          await dispatch(fetchUser()).unwrap();

          setSuccessMessage(t("login_success"));

        //   setToastType("success");

          closeModal();

          onShowToast(t("login success"), "success");
        //   onShowToast(toastMessage, toastType);
          setCredentials({ email: "", password: "" });
          // أغلق المودال إن أردت
          // closeModal();

        } catch (err) {
        //   console.error(err);
        //   setToastMessage(t("login_failed") || "Login failed");
        //   setToastType("error");

          onShowToast(t("login failed") || "Login failed", "error");

        }
    };


    return(
        <div>
            <hr />
            <form onSubmit={handleSubmit} style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
                <label htmlFor="email"  >{t('emial')}:</label>
                <input type="email" style={{borderRadius:'9px'}} autoFocus placeholder="email:" value={credentials.email} onChange={(e)=>setCredentials({...credentials, email: e.target.value, password: credentials.password})}/>

                <label htmlFor="password">{t('password')}:</label>
                <input type="password" style={{borderRadius:'9px'}} value={credentials.password} onChange={(e)=>setCredentials({...credentials, password: e.target.value, email: credentials.email})}/>

                {successMessage && (
                    <p style={{ color: "green" }}>{successMessage}</p>
                )}

                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}


                <button  type="submit" disabled={loading} className="btn btn-primary mt-2">{loading ? t("loading") : t("login")}</button>
            </form>
        </div>
    )
}