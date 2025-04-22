import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "../../services/authServices";

const initialState = {
  user: null,
  loading: true,
};
// getUser
export const fetchAuthUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const data = await authServices.getCurrentUser();
    return data.data;
  }
);
// logoutUser
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const data = await authServices.logout();
  return data.data;
});

const authSlile = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchAuthUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
        state.currentUser = null;
      })
      // logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.currentUser = null;
        state.loading = false;
      });
  },
});

export default authSlile.reducer;
