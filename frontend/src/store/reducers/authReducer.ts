import { IUser } from "@/Types/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  user: IUser | null;
  isLoggedIn: boolean;
}

const initialState: authState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
    },
    userLogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;
