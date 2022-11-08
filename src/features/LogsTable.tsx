import React, {useEffect, useRef, useState} from "react";
import {DataGrid, GridCellParams, GridColumns, GridColumnVisibilityModel, ruRU} from "@mui/x-data-grid";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import clsx from 'clsx';
import {
    selectDevices,
    selectLogs,
    selectPage, selectTimeEnd,
    selectType,
    setDividers,
    setPage, setPageSize
} from "./deviceLogsSlice";
import {Box} from "@mui/material";
import {Divider} from "../common";
import CustomToolbar from "../common/CustomToolbar";

// import "./DeviceTable.sass"

function LogsTable() {
    const dispatch = useAppDispatch()
    // const pageSize = useAppSelector(selectPageSize)
    const page = useAppSelector(selectPage)
    const dividers: number[] = []
    const dividersForJump: Divider[] = []
    const checkColor = (id: number): boolean => {
        id++
        let result = true
        if (dividers.length === 2) return id < dividers[1]
        for (let i = 1; i < dividers.length; i++) {
            if (id >= dividers[dividers.length - 1]) return result
            if ((id >= dividers[i - 1]) && (id < dividers[i])) return result
            result = !result
        }
        return false
    }

    const devices = useAppSelector(selectDevices)
    const logs = useAppSelector(selectLogs)
    const selectedType = useAppSelector(selectType)
    const timeEnd = useAppSelector(selectTimeEnd)

    const defaultColumnOptions = {
        flex: 1,
        editable: false,
        sortable: false,
        cellClassName: (params: GridCellParams<string>) => clsx("table-cell", {
            lgray: !checkColor(Number(params.id)),
        }),
        // cellClassName: "table-cell-wrap",
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
            flex: 1.5,
            getApplyQuickFilterFn: ((value: string) => {
                return (params => {
                    return devices.some(dev => dev.description === params.value)
                })
            })
        }, {
            field: "dateEnd",
            headerName: "Время конца",
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
            hideable: false,
            flex: 1.5,
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
            flex: 2,
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
            flex: 1.5,
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
            flex: .5,
        }, {
            field: "ck",
            headerName: "СК",
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
            flex: .5,
        }, {
            field: "pk",
            headerName: "ПК",
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
            flex: .5,
        }, {
            field: "id",
            headerName: "id",
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
            hideable: false,
        },
    ]

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

            const devRow = {
                id: tempRows.length,
                dateStart: device.description,
                dateEnd: "",
                duration: "",
                message: "",
                device: "",
                arm: "",
                status: "",
                rez: "",
                phase: "",
                pk: "",
                ck: "",
                nk: "",
            }
            tempRows = [...tempRows, devRow]

            dividers.push(tempRows.length)
            dividersForJump.push({description: device.description, num: tempRows.length})

            const shit = {
                region: device.region,
                area: device.area,
                ID: device.ID,
                description: device.description,
            }
            if (logs[JSON.stringify(shit)]) {
                logs[JSON.stringify(shit)].filter(log => log.type === selectedType).forEach((log, index) => {
                    const dateStart = new Date(log.time)
                    const dateEnd = (index === 0) ? new Date(timeEnd ?? "") : new Date(logs[JSON.stringify(shit)].filter(log => log.type === selectedType)[index - 1].time)
                    const duration = dateEnd.getTime() - dateStart.getTime()

                    const hours = Math.floor(duration / (1000 * 60 * 60))
                    const minutes = Math.floor((duration / (1000 * 60)) % 60)
                    // const seconds = Math.floor((duration / 1000) % 60)
                    let seconds = dateEnd.getSeconds() - dateStart.getSeconds()
                    if (seconds < 0) seconds += 60
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
        // console.log(dividers)
        return [...tempRows]
    }

    const rows = convertToRows()

    useEffect(() => {
        dispatch(setDividers(dividersForJump))
    }, [rows])

    return (
        <Box
            sx={{
                height: "92.2vh",
                width: "70%",
                '& .table-cell.lgray': {
                    backgroundColor: 'lightgray',
                },
            }}
        >
            {(rows.length !== 0) && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                disableColumnFilter={true}
                disableSelectionOnClick
                autoPageSize={true}
                onColumnVisibilityModelChange={setColumnVisibility}
                columnVisibilityModel={columnVisibility}
                // pageSize={pageSize}
                onPageSizeChange={newPageSize => dispatch(setPageSize(newPageSize))}
                page={page}
                onPageChange={newPage => dispatch(setPage(newPage))}
                // components={{Toolbar: GridToolbar,}}
                components={{Toolbar: CustomToolbar}}
                onStateChange={(props) => {
                    const filteredRows = rows.filter(row => props.filter.filteredRowsLookup[row.id])
                    const temp: { description: string; num: number; }[] = []
                    filteredRows.forEach((row, id) => {
                        if (devices.some(dev => dev.description === row.dateStart)) {
                            temp.push({description: row.dateStart, num: id + 1})
                        }
                    })
                    if (JSON.stringify(temp) === JSON.stringify(dividersForJump)) return
                    dispatch(setDividers(temp))
                }}
                // componentsProps={{
                //     toolbar: {
                //         showQuickFilter: true,
                //         quickFilterProps: {debounceMs: 500},
                //     },
                // }}
                // rowsPerPageOptions={[10, 15, 20]}
                // checkboxSelection={true}
                // onSelectionModelChange={(newSelectionModel) => {
                // props.setDevices(newSelectionModel.sort().map(selected => props.devicesInfo.devices[Number(selected)]))
                // newSelectionModel.sort().map(q => console.log(props.devicesInfo.devices[Number(q)]))
                // }}
            />}
        </Box>
    )
}

export default LogsTable;