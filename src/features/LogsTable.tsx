import React from "react";
import {DataGrid, GridColumns, GridToolbar, ruRU} from "@mui/x-data-grid";
import {useAppSelector} from "../app/hooks";
import {selectDevices, selectLogs, selectType} from "./deviceLogsSlice";

const defaultColumnOptions = {
    flex: 1,
    editable: false,
    sortable: false,
}

const columns: GridColumns = [
    // {field: "pageNum", headerName: "№ стр.", ...defaultColumnOptions, headerAlign: "center", align: "center",},
    {
        field: "dateStart",
        headerName: "Время начала",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        hideable: false,
    }, {
        field: "dateEnd",
        headerName: "Время конца",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        hideable: false,
    }, {
        field: "duration",
        headerName: "Длительность",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        hideable: false,
    }, {
        field: "message",
        headerName: "Событие",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "device",
        headerName: "Устройство",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "arm",
        headerName: "АРМ",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "status",
        headerName: "Состояние",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "rez",
        headerName: "Режим",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "phase",
        headerName: "Фаза",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "nk",
        headerName: "НК",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "ck",
        headerName: "СК",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "pk",
        headerName: "ПК",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "id",
        headerName: "id",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },
]

function LogsTable() {

    // useEffect(() =>{
    //     props.devices.map(device => {
    //         delete device.idevice
    //         return props.logs[JSON.stringify(device)]?.map(log => console.log(log))
    //     })
    // }, [props.logs])

    const devices = useAppSelector(selectDevices)
    const logs = useAppSelector(selectLogs)
    const selectedType = useAppSelector(selectType)

    const convertToRows = () => {
        let tempRows: any[] = []
        devices.forEach((device, indexDev) => {
            const shit = {
                region: device.region,
                area: device.area,
                ID: device.ID,
                description: device.description,
            }
            if (logs[JSON.stringify(shit)]) {
                logs[JSON.stringify(shit)].forEach((log, index) => {
                    if (log.type === selectedType) {
                        tempRows = [...tempRows, {
                            id: tempRows.length,
                            dateStart: "",
                            dateEnd: "",
                            duration: "",
                            message: log.text,
                            device: log.journal.device ?? "",
                            arm: log.journal.arm ?? "",
                            status: log.journal.status ?? "",
                            rez: log.journal.rez ?? "",
                            phase: log.journal.phase ?? "",
                            pk: log.journal.pk ?? "",
                            ck: log.journal.ck ?? "",
                            nk: log.journal.nk ?? "",
                        }]
                    }
                })
            }
        })
        return tempRows
    }

    const rows = convertToRows()

    return (
        <div style={{height: "90vh", width: "50%"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                hideFooter
                // columnVisibilityModel={{
                //     id: false,
                // }}
                components={{
                    Toolbar: GridToolbar,
                }}
                // checkboxSelection={true}
                // onSelectionModelChange={(newSelectionModel) => {
                // props.setDevices(newSelectionModel.sort().map(selected => props.devicesInfo.devices[Number(selected)]))
                // newSelectionModel.sort().map(q => console.log(props.devicesInfo.devices[Number(q)]))
                // }}
            />}
        </div>
    )
}

export default LogsTable;