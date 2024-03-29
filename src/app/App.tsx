import React, {useEffect, useState} from 'react';
import './App.sass';
import axios, {AxiosResponse} from "axios";
import AppBar from "../features/AppBar";
import Tables from "../features/Tables";
import {Device, DevicesInfo} from "../common";
import {useAppDispatch, useAppSelector} from "./hooks";
import {selectDevices, setDevices, setLogFileName, setLogs, setTimeEndSave} from "../features/deviceLogsSlice";

function isRemoteOpen(): Device[] {
    const region = localStorage.getItem("region"),
        area = localStorage.getItem("area"),
        ID = Number(localStorage.getItem("ID")),
        description = localStorage.getItem("description")

    if (region && area && ID && description) {
        return [{region, area, ID, description}]
    } else {
        return []
    }
}

function App() {
    const dispatch = useAppDispatch()
    const [devicesInfo, setDevicesInfo] = useState<DevicesInfo>()

    // const devices = useAppSelector(selectDevices)
    const [selectedDevices, setSelectedDevices] = useState<Device[]>(isRemoteOpen())

    // const [logs, setLogs] = useState<DeviceLogs>({})


    const [timeStart, setTimeStart] = useState<Date>(new Date(2000, 0, 0))
    const [timeEnd, setTimeEnd] = useState<Date>(new Date(2000, 0, 0))
    //
    // useEffect(() => {
    //     setTimeStart(new Date(new Date().setHours(new Date().getTimezoneOffset() / -60, 0, 0, 0)).toISOString())
    //     setTimeEnd(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString())
    // }, [])

    useEffect(() => {
        if (selectedDevices.length !== 0) {
            setDevices(selectedDevices)
            const timeStart1 = new Date(new Date().setHours(0, 0, 0)).toISOString()
            const timeEnd1 = new Date().toISOString()
            getLogs(timeStart1, timeEnd1)
        }
    }, [])

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
                devices: selectedDevices,
                timeStart: new Date(new Date(timeStart).setHours(new Date(timeStart).getHours() - new Date().getTimezoneOffset() / 60)).toISOString(),
                timeEnd: new Date(new Date(timeEnd).setHours(new Date(timeEnd).getHours() - new Date().getTimezoneOffset() / 60)).toISOString(),
            })
        ).then(response => {
            setTimeout(() => {
                if (localStorage.getItem("region") !== null) {
                    localStorage.removeItem("region")
                    localStorage.removeItem("area")
                    localStorage.removeItem("ID")
                    localStorage.removeItem("description")
                }
            }, 1000)

            dispatch(setLogs(response.data.deviceLogs))
            dispatch(setLogFileName("log-" + new Date(timeStart).toLocaleString() + "-" + new Date(timeEnd).toLocaleString() + ".xlsx"))
            dispatch(setTimeEndSave(timeEnd))
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
            // console.log("success", response)
            setDevicesInfo(response.data)
        }).catch((error) => {
            window.alert(error.message)
        })
    }, [])

    return (
        <div className="App">
            <AppBar getLogs={getLogs} timeStart={timeStart} setTimeStart={setTimeStart} timeEnd={timeEnd}
                    setTimeEnd={setTimeEnd}/>
            {devicesInfo && <Tables devicesInfo={devicesInfo} setDevices={setSelectedDevices}/>}
        </div>
    );
}

export default App;
