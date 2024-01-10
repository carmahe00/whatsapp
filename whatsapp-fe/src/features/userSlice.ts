import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axios, { AxiosError } from "axios";
const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`
export interface InitialStateProp {
    user: {
        id: string;
        name: string;
        email: string;
        picture: string;
        status: string;
        acces_token: string;
    };
    status: "loading" | "succeded" | "failed" | "";
    error: string | [];
}

const initialState: InitialStateProp = {
    error: "",
    status: "",
    user: {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        acces_token: "",
    }
};

export const registerUser = createAsyncThunk("auth/register", async (values: any, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, { ...values })
        return data
    } catch (error) {
        const err = error as AxiosError<any>
        console.log(err)
        if (err.response && typeof err.response.data.error.message)
            return rejectWithValue(err.response.data.error.message as string)
        else if (err.response)
            return rejectWithValue(err.response.data.error)
    }
})

export const loginUser = createAsyncThunk("auth/login", async (values: any, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${AUTH_ENDPOINT}/login`, { ...values })
        return data
    } catch (error) {
        const err = error as AxiosError<any>
        if (err.response && typeof err.response.data.error.message)
            return rejectWithValue(err.response.data.error.message as string)
        else if (err.response)
            return rejectWithValue(err.response.data.error)
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.error = "";
                state.status = "";
                state.user = {
                    id: "",
                    name: "",
                    email: "",
                    picture: "",
                    status: "",
                    acces_token: "",
                }
        },
        changeStatus: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeded"
                state.error = ""
                state.user = action.payload.user
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as string
            })
            .addCase(loginUser.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeded"
                state.error = ""
                state.user = action.payload.user
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as string
            })
    }
})

export const { logout, changeStatus } = userSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer

