import React, {useEffect, useState} from 'react';
import './App.css';
import axios, {AxiosResponse} from "axios";
import AppBar from "../features/AppBar";
import Tables from "../features/Tables";
import {DeviceLogs, DevicesInfo, DevToSend} from "../common";
import {useAppDispatch, useAppSelector} from "./hooks";
import {selectDevices, setLogs} from "../features/deviceLogsSlice";

function App() {
    const dispatch = useAppDispatch()
    const [devicesInfo, setDevicesInfo] = useState<DevicesInfo>()

    const devices = useAppSelector(selectDevices)
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
            href = "https://192.168.0.101:4443/user/Admin/deviceLog/info"
        } else {
            href = window.location.href + '/info'
        }

        axios.post(
            href,
            JSON.stringify({
                devices, timeStart, timeEnd
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
            href = "https://192.168.0.101:4443/user/Admin/deviceLog"
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
            {devicesInfo && <Tables devicesInfo={devicesInfo}/>}
        </div>
    );
}

export default App;
