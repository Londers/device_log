import React, {useEffect, useState} from "react";
import {Button, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import CustomTimePicker from "../common/CustomTimePicker";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectDividers, selectPageSize, selectType, setPage, setType} from "./deviceLogsSlice";

function AppBar(props: { getLogs: Function, timeStart: Date, setTimeStart: Function, timeEnd: Date, setTimeEnd: Function }) {
    const dispatch = useAppDispatch()
    const pageSize = useAppSelector(selectPageSize)
    const selectedType = useAppSelector(selectType)
    const dividers = useAppSelector(selectDividers)

    useEffect(() => {
        props.setTimeStart(new Date().setHours(0, 0, 0))
        props.setTimeEnd(new Date())
    }, [])

    const handleDayButtonClick = () => {
        // const timeStart1 = new Date(new Date().setHours(new Date().getTimezoneOffset() / -60, 0, 0, 0)).toISOString()
        // const timeEnd1 = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString()
        const timeStart1 = new Date(new Date().setHours(0, 0, 0)).toISOString()
        const timeEnd1 = new Date().toISOString()
        props.setTimeStart(new Date(timeStart1))
        props.setTimeEnd(new Date(timeEnd1))
        props.getLogs(timeStart1, timeEnd1)
    }

    const handleChosenTimeClick = () => {
        props.getLogs(props.timeStart.toISOString(), props.timeEnd.toISOString())
    }

    const [selectVal, setSelectVal] = useState(1)

    return (
        <div style={{display: "inline-flex", padding: "4px", width: "98%"}} className="appBar">
            <Button variant="outlined" onClick={handleDayButtonClick}>
                Сутки
            </Button>
            <div style={{display: "inline-flex"}} className="chosenTime">
                <Button variant="outlined" onClick={handleChosenTimeClick}>
                    Выбранное время
                </Button>
                <div>
                    С
                </div>
                <CustomTimePicker date={props.timeStart} setDate={props.setTimeStart}/>
                <div>
                    до
                </div>
                <CustomTimePicker date={props.timeEnd} setDate={props.setTimeEnd}/>
            </div>
            <Select
                value={selectedType}
                onChange={(event: SelectChangeEvent<number>) => dispatch(setType(Number(event.target.value)))}
            >
                <MenuItem value={0}>Технология</MenuItem>)
                <MenuItem value={1}>Устройства</MenuItem>)
                <MenuItem value={2}>Двери и лампы</MenuItem>)
            </Select>
            {(dividers.length > 1) && <Select
                sx={{maxWidth: "200px"}}
                value={selectVal}
                onChange={(event: SelectChangeEvent<number>) => {
                    dispatch(setPage(Math.floor(Number(event.target.value) / pageSize)))
                    setSelectVal(Number(event.target.value))
                }}
            >
                {(dividers.length !== 0) && dividers.map(div =>
                    <MenuItem value={div.num} key={div.num}>{div.description}</MenuItem>
                )}
            </Select>}
            <Button variant="outlined"
                    onClick={() => window.open(window.location.origin + "/user/" + localStorage.getItem("login") + "/deviceJournal")}>
                Внутренний журнал
            </Button>
        </div>
    )
}

export default AppBar;