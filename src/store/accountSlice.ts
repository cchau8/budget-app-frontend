import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
    _id: string;
    balance: number;
    title: string;
}

export interface AccountsState {
    accounts: AccountState[];
}

const initialState: AccountsState = {
    accounts: [],
};

export const accountSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        setAccounts: (state, action: PayloadAction<AccountsState>) => {
            state.accounts = action.payload.accounts;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAccounts } = accountSlice.actions;

export default accountSlice.reducer;
