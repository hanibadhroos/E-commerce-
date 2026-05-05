import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { invalidateProducts, fetchProducts } from "../products/productsSlice";


const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  isAuthenticated: false,
  cjToken: null,
  authReady: false
};

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("api/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Register failed");
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue })=> {
    try {
      const response = await api.post("/api/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    await api.post("/api/logout"); 
    localStorage.removeItem("token");
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("api/user");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Unauthorized");
    }
  }
);
export const getCJToken = createAsyncThunk(
  "auth/cj-token",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/admin/cj-token');
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data || 'Get cj token failed.');
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

    ////Cj-token
      .addCase(getCJToken.pending, (state)=>{
        state.loading = true;
        state.error =null;
      })
      .addCase(getCJToken.fulfilled, (state, action)=>{
        state.loading = false;
        state.cjToken = action.payload.data;
        localStorage.setItem('cj-token', action.payload.data);
      })
      .addCase(getCJToken.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
      })

    // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      /////Fetch user info
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.authReady = true;
      })

      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        state.authReady = true;
        // localStorage.removeItem("token");
      })
      
      
  },
});

export default authSlice.reducer;
