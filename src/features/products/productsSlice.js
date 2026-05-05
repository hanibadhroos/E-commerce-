import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";


const  CACHE_TIME = 1000 * 60 * 5;

export const fetchProducts = createAsyncThunk(
    "products/fetch",
    async(_, { getState, rejectWithValue}) =>{
        try{
            const state = getState().products;

            const now = Date.now();

            if(state.lastFetched && now - state.lastFetched < CACHE_TIME){
                return state.items
            }

            const res = await api.get('/api/products');
            return res.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data || "Error");
        }
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState:{
        items: [],
        loading: false,
        error: null,
        lastFetched: null
    },
    reducers:{
        invalidateProducts: (state) =>{
            state.lastFetched = null
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchProducts.pending, (state) =>{
            state.loading = true
        })
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            state.loading = false;
            state.items = action.payload;
            state.lastFetched = Date.now();
        })
        .addCase(fetchProducts.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const {invalidateProducts } = productsSlice.actions;
export default productsSlice.reducer;