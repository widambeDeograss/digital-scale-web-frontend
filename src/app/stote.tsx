import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

const Store = configureStore({
    reducer: {
        auth : AuthSlice,
    }
});

export default Store;
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatcher = typeof Store.dispatch;