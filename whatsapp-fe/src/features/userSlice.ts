import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axios, { AxiosError } from "axios";
const AUTH_ENDPOINT = `${process.env.EN_APP_API_ENDPOINT}/auth`
export interface InitialStateProp {
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

const initialState: InitialStateProp = {
    error: "",
    status: "",
    user: {
        id: "",
        name: "John",
        email: "john@mail.com",
        picture: "",
        status: "active",
        token: "",
    }
};

export const registerUser = createAsyncThunk("auth/register", async (values: any, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${AUTH_ENDPOINT}/register`,{...values})
        return data
    } catch (error) {
        const err = error as AxiosError<any>
        console.log(err)
        if (err.response)
            return rejectWithValue(err.response.data.error.message)

    }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => initialState
    },
    extraReducers(builder){
        builder.addCase(registerUser.pending, (state, action)=>{
            state.status = "loading"
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.status = "succeded"
        })
    }
})

export const { logout } = userSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer

