import React, {useEffect, useState} from "react";
import {DataGrid, GridColumns, GridColumnVisibilityModel, GridToolbar, ruRU} from "@mui/x-data-grid";
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
        flex: 2,
    }, {
        field: "dateEnd",
        headerName: "Время конца",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        hideable: false,
        flex: 2,
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
        hideable: false,
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

    const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
        arm: true,
        ck: true,
        dateEnd: true,
        dateStart: true,
        device: true,
        duration: true,
        id: false,
        message: true,
        nk: true,
        phase: true,
        pk: true,
        rez: true,
        status: true,
    })

    useEffect(() => {
        switch (selectedType) {
            case 0:
                setColumnVisibility({
                    arm: true,
                    ck: true,
                    dateEnd: true,
                    dateStart: true,
                    device: false,
                    duration: true,
                    id: false,
                    message: false,
                    nk: true,
                    phase: false,
                    pk: true,
                    rez: true,
                    status: false,
                })
                break;
            case 1:
                setColumnVisibility({
                    arm: true,
                    ck: false,
                    dateEnd: true,
                    dateStart: true,
                    device: true,
                    duration: true,
                    id: false,
                    message: false,
                    nk: false,
                    phase: true,
                    pk: false,
                    rez: true,
                    status: true,
                })
                break;
            case 2:
                setColumnVisibility({
                    arm: false,
                    ck: false,
                    dateEnd: true,
                    dateStart: true,
                    device: false,
                    duration: true,
                    id: false,
                    message: true,
                    nk: false,
                    phase: false,
                    pk: false,
                    rez: false,
                    status: false,
                })
                break;
        }
    }, [selectedType])

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
                logs[JSON.stringify(shit)].filter(log => log.type === selectedType).forEach((log, index) => {
                    const dateStart = new Date(log.time)
                    const dateEnd = (index === 0) ? new Date() : new Date(logs[JSON.stringify(shit)][index - 1].time)
                    const duration = dateEnd.getTime() - dateStart.getTime()

                    const hours = Math.floor(duration / (1000 * 60 * 60))
                    const minutes = Math.floor((duration / (1000 * 60)) % 60)
                    const seconds = Math.floor((duration / 1000) % 60)
                    const durationString = hours + 'ч ' + minutes + 'м ' + seconds + 'с'

                    const row = {
                        id: tempRows.length,
                        dateStart: dateStart.toLocaleString('ru-RU'),
                        dateEnd: dateEnd.toLocaleString('ru-RU'),
                        duration: durationString,
                        message: log.text,
                        device: log.journal.device ?? "",
                        arm: log.journal.arm ?? "",
                        status: log.journal.status ?? "",
                        rez: log.journal.rez ?? "",
                        phase: log.journal.phase ?? "",
                        pk: log.journal.pk ?? "",
                        ck: log.journal.ck ?? "",
                        nk: log.journal.nk ?? "",
                    }
                    tempRows = [...tempRows, row]
                })
            }
        })
        console.log("after", tempRows)
        return tempRows
    }

    const rows = convertToRows()

    return (
        <div style={{height: "90vh", width: "80%"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                hideFooter
                onColumnVisibilityModelChange={setColumnVisibility}
                columnVisibilityModel={columnVisibility}
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