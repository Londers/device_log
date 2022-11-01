import React, {useEffect, useState} from 'react';
import './App.css';
import axios, {AxiosResponse} from "axios";
import AppBar from "../features/AppBar";
import Tables from "../features/Tables";
import {Device, DevicesInfo} from "../common";
import {useAppDispatch, useAppSelector} from "./hooks";
import {selectDevices, setDevices, setLogs} from "../features/deviceLogsSlice";

function App() {
    const dispatch = useAppDispatch()
    const [devicesInfo, setDevicesInfo] = useState<DevicesInfo>()

    // const devices = useAppSelector(selectDevices)
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([])

    // const [logs, setLogs] = useState<DeviceLogs>({})

    // const [timeStart, setTimeStart] = useState<string>("")
    // const [timeEnd, setTimeEnd] = useState<string>("")
    //
    // useEffect(() => {
    //     setTimeStart(new Date(new Date().setHours(new Date().getTimezoneOffset() / -60, 0, 0, 0)).toISOString())
    //     setTimeEnd(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString())
    // }, [])

    const getLogs = (timeStart: string, timeEnd: string) => {
        let href = ""
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            href = "https://192.168.115.134:4443/user/Admin/deviceLog/info"
            // href = "https://192.168.0.101:4443/user/Admin/deviceLog/info"
        } else {
            href = window.location.href + '/info'
        }

        dispatch(setDevices(selectedDevices))
        if (selectedDevices.length === 0) return
        axios.post(
            href,
            JSON.stringify({
                devices: selectedDevices, timeStart, timeEnd
            })
        ).then(response => {
            dispatch(setLogs(response.data.deviceLogs))
            // setLogs(response.data.deviceLogs)
            // console.log(response)
        }).catch(err => alert(err))
    }

    useEffect(() => {
        let href = ""
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            href = "https://192.168.115.134:4443/user/Admin/deviceLog"
            // href = "https://192.168.0.101:4443/user/Admin/deviceLog"
        } else {
            href = window.location.href
        }
        axios.post(
            href,
            // action.payload,
        ).then((response: AxiosResponse<DevicesInfo>) => {
            // window.alert("Пароль успешно изменён. Пожалуйста, войдите в аккаунт снова.")
            console.log("success", response)
            setDevicesInfo(response.data)
        }).catch((error) => {
            window.alert(error.message)
        })
    }, [])

    return (
        <div className="App">
            <AppBar getLogs={getLogs}/>
            {devicesInfo && <Tables devicesInfo={devicesInfo} setDevices={setSelectedDevices}/>}
        </div>
    );
}

export default App;
