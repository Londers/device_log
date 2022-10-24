import React from "react";
import {DeviceLogs, DevicesInfo, DevToSend} from "../common";
import DevicesTable from "./DevicesTable";
import LogsTable from "./LogsTable";

function Tables(props: { devicesInfo: DevicesInfo, devices: DevToSend[], setDevices: Function, logs: DeviceLogs }) {

    return (
        <div style={{display: "inline-flex", width: "100%"}}>
            {/*{props.devicesInfo.devices.map(device => <div>{JSON.stringify(device)}</div>)}*/}
            <DevicesTable devicesInfo={props.devicesInfo} setDevices={props.setDevices}/>
            <LogsTable devices={props.devices} logs={props.logs} />
        </div>
    )
}

export default Tables