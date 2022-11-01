import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Device, DeviceLogs, DevLogsSlice, Divider} from "../common";
import {RootState} from "../app/store";

const initialState: DevLogsSlice = {
    devices: [],
    logs: {},
    selectedType: 1,
    dividers: [],
    pageSize: 10,
    page: 0,
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
        setDividers: (state, action: PayloadAction<Divider[]>) => {
            state.dividers = action.payload
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
    },
})

export const {
    setDevices,
    setLogs,
    setType,
    setDividers,
    setPageSize,
    setPage,
} = deviceLogsSlice.actions

export const selectDevices = (state: RootState) => state.deviceLogs.devices
export const selectLogs = (state: RootState) => state.deviceLogs.logs
export const selectType = (state: RootState) => state.deviceLogs.selectedType
export const selectDividers = (state: RootState) => state.deviceLogs.dividers
export const selectPageSize = (state: RootState) => state.deviceLogs.pageSize
export const selectPage = (state: RootState) => state.deviceLogs.page

export default deviceLogsSlice.reducer