import React, {useEffect, useRef} from "react";
import {DeviceLogs, DevToSend} from "../common";
import {DataGrid, GridColumns, ruRU} from "@mui/x-data-grid";

const defaultColumnOptions = {
    flex: 1,
    editable: false,
    sortable: false,
}

const columns: GridColumns = [
    // {field: "pageNum", headerName: "№ стр.", ...defaultColumnOptions, headerAlign: "center", align: "center",},
    {
        field: "dateStart",
        headerName: "dateStart",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "dateEnd",
        headerName: "dateEnd",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "duration",
        headerName: "duration",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "message",
        headerName: "message",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "device",
        headerName: "device",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "arm",
        headerName: "arm",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "status",
        headerName: "status",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "rez",
        headerName: "rez",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "phase",
        headerName: "phase",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "nk",
        headerName: "nk",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "ck",
        headerName: "ck",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "pk",
        headerName: "pk",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "id",
        headerName: "id",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },
]

function LogsTable(props: { devices: DevToSend[], logs: DeviceLogs }) {
    
    // useEffect(() =>{
    //     props.devices.map(device => {
    //         delete device.idevice
    //         return props.logs[JSON.stringify(device)]?.map(log => console.log(log))
    //     })
    // }, [props.logs])

    let rows = useRef<any>([])

    useEffect(() => {
        props.devices.forEach((device, indexDev) => {
            if (JSON.stringify(props.logs) === "{}") return {id: device}
            delete device.idevice
            props.logs[JSON.stringify(device)].forEach((log, index) => {
                rows.current = [...rows.current, {
                    id: log.id,
                    dateStart: "",
                    dateEnd: "",
                    duration: "",
                    message: log.text ?? "",
                    device: "",
                    arm: "",
                    status: "",
                    rez: "",
                    phase: "",
                    nk: "",
                    ck: "",
                    pk: "",
                }]
            })
        })
    }, [props.logs])

    return (
        <div style={{height: "90vh", width: "50%"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows.current}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                hideFooter
                // checkboxSelection={true}
                // onSelectionModelChange={(newSelectionModel) => {
                    // props.setDevices(newSelectionModel.sort().map(selected => props.devicesInfo.devices[Number(selected)]))
                    // newSelectionModel.sort().map(q => console.log(props.devicesInfo.devices[Number(q)]))
                // }}
            />}
        </div>
        // <div>
        //     {props.devices.map(device => {
        //         delete device.idevice
        //         return props.logs[JSON.stringify(device)]?.map(log => <>{JSON.stringify(log)}</>)
        //     })}
        // </div>
    )
}

export default LogsTable;