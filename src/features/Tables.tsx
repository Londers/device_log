import React from "react";
import {DevicesInfo} from "../common";
import DevicesTable from "./DevicesTable";
import LogsTable from "./LogsTable";

function Tables(props: { devicesInfo: DevicesInfo, setDevices: Function}) {

    return (
        <div style={{display: "inline-flex", width: "100%"}}>
            {/*{props.devicesInfo.devices.map(device => <div>{JSON.stringify(device)}</div>)}*/}
            <DevicesTable devicesInfo={props.devicesInfo} setDevices={props.setDevices}/>
            <LogsTable/>
        </div>
    )
}

export default Tables