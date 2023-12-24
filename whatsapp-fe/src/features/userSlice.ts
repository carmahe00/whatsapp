import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface InitialStateProp{
    user: {
        id: string;
        name: string;
        email: string;
        picture: string;
        status: string;
        token: string;
    };
    status: string;
    error: string;
}

const initialState:InitialStateProp = {
    error: "",
    status: "",
    user:{
        id: "",
        name: "John",
        email: "john@mail.com",
        picture: "",
        status: "active",
        token: "",
    }
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state)=>initialState
    }
})

export const { logout } = userSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer

