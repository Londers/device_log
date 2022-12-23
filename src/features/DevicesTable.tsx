import React, {useEffect, useRef, useState} from "react";
import {DevicesInfo} from "../common";
import {DataGrid, GridColumns, GridToolbarQuickFilter, ruRU} from "@mui/x-data-grid";
import "./DeviceTable.sass"

const defaultColumnOptions = {
    editable: false,
    sortable: false,
    cellClassName: "table-cell-wrap",
}

const columns: GridColumns = [
    {
        field: "region",
        headerName: "Регион",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 2,
    }, {
        field: "area",
        headerName: "Район",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 2,
    }, {
        field: "ID",
        headerName: "ID",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 2,
    }, {
        field: "description",
        headerName: "Описание",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 4,
    },
]

function DevicesTable(props: { devicesInfo: DevicesInfo, setDevices: Function }) {
    const rows = props.devicesInfo.devices.map((device, index) => {
        const region = props.devicesInfo.regionInfo[device.region]
        return {
            id: index,
            region,
            area: props.devicesInfo.areaInfo[region][device.area],
            ID: device.idevice,
            description: device.description,
        }
    })

    const selection = useRef<number[]>([props.devicesInfo.devices.findIndex(dev =>
        (dev.region === localStorage.getItem("region")) && (dev.area === localStorage.getItem("area"))
        && (dev.ID === Number(localStorage.getItem("ID"))) && (dev.description === localStorage.getItem("description")))])

    const waitAppRender = useRef<boolean>(true)
    useEffect(() => {
        waitAppRender.current = false
    }, [])

    return (
        <div style={{height: "92.2vh", width: "30%"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                hideFooter
                checkboxSelection={true}
                onSelectionModelChange={(newSelectionModel) => {
                    // props.setDevices(newSelectionModel.sort().map(selected => props.devicesInfo.devices[Number(selected)]))
                    if (!waitAppRender.current)props.setDevices(newSelectionModel.sort().map(selected => props.devicesInfo.devices[Number(selected)]))
                    selection.current = newSelectionModel.map(sel => Number(sel))
                    // dispatch(setDevices(newSelectionModel.sort().map(selected => props.devicesInfo.devices[Number(selected)])))
                }}
                selectionModel={selection.current}
                components={{
                    // Toolbar: GridToolbar,
                    Toolbar: () => <GridToolbarQuickFilter/>
                }}
                density="comfortable"
                // disableColumnSelector={true}
                // disableColumnFilter={true}
                // disableDensitySelector={true}
                // componentsProps={{
                //     toolbar: {
                //         showQuickFilter: true,
                //         quickFilterProps: {debounceMs: 500},
                //     },
                // }}
            />}
        </div>
    )
}

export default DevicesTable;