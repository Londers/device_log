import {configureStore} from "@reduxjs/toolkit";
import {deviceLogsSlice} from "../features/deviceLogsSlice";

export const store = configureStore({
    reducer: {
        deviceLogs: deviceLogsSlice.reducer,
    },
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware().prepend(WebSocketListenerMiddleware.middleware).prepend(TabReloadMiddleware.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// export type AccountState = ReturnType<typeof accountSlice.reducer>
export type AppDispatch = typeof store.dispatch