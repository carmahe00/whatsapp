import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../app/store";
import {ConversationInterface, Messages } from "../common/common.inteface";
const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`




export interface chatInterface {
    status: "" | "loading" | "succeeded" | "failed";
    error: string;
    conversations: ConversationInterface[];
    activeConversation: ConversationInterface ;
    notifications: never[];
    messages:Messages[]
    files: {
        imgData: string | ArrayBuffer | null | undefined;
        file: File;
        type: string;
    }[]
}
const initialState:chatInterface = {
    status: "",
    error: "",
    conversations: [],
    activeConversation: {} as ConversationInterface,
    notifications: [],
    messages: [],
    files: []
};
export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setActiveConversation: (state, action)=>{
            state.activeConversation = action.payload
        },
        updateMessageAndConversations: (state, action) =>{
            let convo = state.activeConversation
            if(convo._id === action.payload.conversation._id){
                state.messages = [...state.messages, action.payload]
            }
            //Update conversation
            let conversation = {
                ...action.payload.conversation,
                latestMessage: action.payload
            }
            let newConvo = [
                ...state.conversations
            ].filter(c => c._id !== conversation._id)
            
            newConvo.unshift(conversation)
            state.conversations= newConvo
        },
        addFiles: (state, action)=>{
            state.files = [...state.files, action.payload]
        },
        clearFiles: (state)=>{
            state.files = []
        },
        removeFileFromFiles: (state, action) =>{
            let index = action.payload
            let files = [...state.files]
            let fileToRemove = [files[index]]
            state.files = files.filter((file) => !fileToRemove.includes(file))
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
        .addCase(openCreateConversation.pending, (state, action)=>{
            state.status = "loading"
        })
        .addCase(openCreateConversation.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.activeConversation = action.payload
            state.files = []
        })
        .addCase(openCreateConversation.rejected, (state, action)=>{
            state.status = "failed"
            state.error = action.payload as string
        })
        .addCase(getConversationMessages.pending, (state, action)=>{
            state.status = "loading"
        })
        .addCase(getConversationMessages.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.messages = action.payload
        })
        .addCase(getConversationMessages.rejected, (state, action)=>{
            state.status = "failed"
            state.error = action.payload as string
        })
        .addCase(sendMessages.pending, (state, action)=>{
            state.status = "loading"
        })
        .addCase(sendMessages.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.messages = [...state.messages, action.payload]
            let conversation = {
                ...action.payload.conversation,
                latestMessage: action.payload
            }
            let newConvo = [
                ...state.conversations
            ].filter(c => c._id !== conversation._id)
            
            newConvo.unshift(conversation)
            state.conversations= newConvo
        })
        .addCase(sendMessages.rejected, (state, action)=>{
            state.status = "failed"
            state.error = action.payload as string
        })
    }
})

export const getConversation = createAsyncThunk("conversation/all",async (token:string, { rejectWithValue }) => {
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

export const openCreateConversation = createAsyncThunk("conversation/open_create",async (values:any, { rejectWithValue }) => {
    try {
        const {acces_token, receiver_id} = values
        const { data } = await axios.post(CONVERSATION_ENDPOINT, {receiver_id},{
            headers:{
                Authorization: `Bearer ${acces_token}`
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

export const getConversationMessages = createAsyncThunk("conversation/messages",async (values:any, { rejectWithValue }) => {
    try {
        const {acces_token, convo_id} = values
        const { data } = await axios.get(`${MESSAGE_ENDPOINT}/${convo_id}`,{
            headers:{
                Authorization: `Bearer ${acces_token}`
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

export const sendMessages = createAsyncThunk("messages/send",async (values:any, { rejectWithValue }) => {
    try {
        const {acces_token, convo_id, message, files} = values
        const { data } = await axios.post(MESSAGE_ENDPOINT,{
            message,
            convo_id,
            files
        },{
            headers:{
                Authorization: `Bearer ${acces_token}`
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

export const { setActiveConversation, updateMessageAndConversations, addFiles, clearFiles, removeFileFromFiles } = chatSlice.actions
export const selectChat = (state: RootState) => state.chat
export default chatSlice.reducer