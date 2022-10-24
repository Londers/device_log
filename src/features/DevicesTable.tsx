import React from "react";
import {DevicesInfo} from "../common";
import {DataGrid, GridColumns, ruRU} from "@mui/x-data-grid";

const defaultColumnOptions = {
    flex: 1,
    editable: false,
    sortable: false,
}

const columns: GridColumns = [
    // {field: "pageNum", headerName: "№ стр.", ...defaultColumnOptions, headerAlign: "center", align: "center",},
    {
        field: "region",
        headerName: "Регион",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
        field: "area",
        headerName: "Район",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 1.5,
    },{
        field: "ID",
        headerName: "ID устройства",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },{
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
            ID: device.ID,
            description: device.description,
        }
    })

    return (
        // <div style={{height: "682px", width: "42rem", display: "flex", alignItems: "flex-start"}}>
        <div style={{height: "90vh", width: "50%"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                hideFooter
                checkboxSelection={true}
                onSelectionModelChange={(newSelectionModel) => {
                    props.setDevices(newSelectionModel.sort().map(selected => props.devicesInfo.devices[Number(selected)]))
                    // newSelectionModel.sort().map(q => console.log(props.devicesInfo.devices[Number(q)]))
                }}
            />}
        </div>
    )
}

export default DevicesTable;