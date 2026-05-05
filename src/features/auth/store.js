import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productsReducer from "../products/productsSlice";
export const store = configureStore({

    reducer:{
        auth:authReducer,
        products: productsReducer
    }
})
