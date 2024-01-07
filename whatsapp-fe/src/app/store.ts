import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSlice from "../features/userSlice";
import {
    persistStore,
    persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";



const rootReducer = combineReducers({
    user: userSlice,
})


// persist config
const persistedReducer = persistReducer(
    {
        key: "user",
        version: 1,
        storage,
        whitelist: ["user"]
    },
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const persistor = persistStore(store);