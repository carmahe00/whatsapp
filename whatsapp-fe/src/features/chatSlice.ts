import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../app/store";
import { ConversationInterface } from "../common/common.inteface";
const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`




export interface chatInterface {
    status: "" | "loading" | "succeeded" | "failed";
    error: string;
    conversations: ConversationInterface[];
    activeConversation: {};
    notifications: never[];
}
const initialState:chatInterface = {
    status: "",
    error: "",
    conversations: [],
    activeConversation: {},
    notifications: []
};
export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setActiveConversation: (state, action)=>{
            state.activeConversation = action.payload
        }
    },
    extraReducers(builder){
        builder
        .addCase(getConversation.pending, (state, action)=>{
            state.status = "loading"
        })
        .addCase(getConversation.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.conversations = action.payload
        })
        .addCase(getConversation.rejected, (state, action)=>{
            state.status = "failed"
            state.error = action.payload as string
        })
    }
})

export const getConversation = createAsyncThunk("conversation",async (token:string, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(CONVERSATION_ENDPOINT, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        const err = error as AxiosError<any>
        if (err.response && typeof err.response.data.error.message)
            return rejectWithValue(err.response.data.error.message as string)
        else if (err.response)
            return rejectWithValue(err.response.data.error)
    }
})

export const { setActiveConversation } = chatSlice.actions
export const selectChat = (state: RootState) => state.chat
export default chatSlice.reducer