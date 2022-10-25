import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Device, DeviceLogs, DevLogsSlice} from "../common";
import {RootState} from "../app/store";

const initialState: DevLogsSlice = {
    devices: [],
    logs: {},
    selectedType: 1,
}

export const deviceLogsSlice = createSlice({
    name: "deviceLogs",
    initialState,
    reducers: {
        setDevices: (state, action: PayloadAction<Device[]>) => {
            state.devices = action.payload
        },
        setLogs: (state, action: PayloadAction<DeviceLogs>) => {
            state.logs = action.payload
        },
        setType: (state, action: PayloadAction<number>) => {
          state.selectedType = action.payload
        },
    },
})

export const {
    setDevices,
    setLogs,
    setType,
} = deviceLogsSlice.actions

export const selectDevices = (state: RootState) => state.deviceLogs.devices
export const selectLogs = (state: RootState) => state.deviceLogs.logs
export const selectType = (state: RootState) => state.deviceLogs.selectedType

export default deviceLogsSlice.reducer