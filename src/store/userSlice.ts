import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    userData: { userId: string; username: string; email: string };
    token: string;
}

const initialState: UserState = {
    userData: { userId: "", username: "", email: "" },
    token: "",
};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.userData = action.payload.userData;
            state.token = action.payload.token;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
