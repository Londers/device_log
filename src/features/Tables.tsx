import React from "react";
import {DevicesInfo} from "../common";
import DevicesTable from "./DevicesTable";
import LogsTable from "./LogsTable";

function Tables(props: { devicesInfo: DevicesInfo}) {

    return (
        <div style={{display: "inline-flex", width: "100%"}}>
            {/*{props.devicesInfo.devices.map(device => <div>{JSON.stringify(device)}</div>)}*/}
            <DevicesTable devicesInfo={props.devicesInfo}/>
            <LogsTable />
        </div>
    )
}

export default Tables