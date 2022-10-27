import React from "react";
import {DevicesInfo} from "../common";
import {DataGrid, GridColumns, GridToolbarQuickFilter, ruRU} from "@mui/x-data-grid";
import {useAppDispatch} from "../app/hooks";
import {setDevices} from "./deviceLogsSlice";
import "./DeviceTable.sass"

const defaultColumnOptions = {
    flex: 1,
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
        flex: 1.5,
    }, {
        field: "ID",
        headerName: "ID",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "description",
        headerName: "Описание",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 4,
    },
]

function DevicesTable(props: { devicesInfo: DevicesInfo }) {
    const dispatch = useAppDispatch()

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
        <div style={{height: "90vh", width: "30%"}}>
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
                    dispatch(setDevices(newSelectionModel.sort().map(selected => props.devicesInfo.devices[Number(selected)])))
                }}
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