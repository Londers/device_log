import React, {useEffect, useState} from "react";
import {Button, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import CustomTimePicker from "../common/CustomTimePicker";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectType, setType} from "./deviceLogsSlice";

function AppBar(props: { getLogs: Function }) {
    const dispatch = useAppDispatch()
    const selectedType = useAppSelector(selectType)
    const [timeStart, setTimeStart] = useState<Date>(new Date(2000,0,0))
    const [timeEnd, setTimeEnd] = useState<Date>(new Date(2000,0,0))

    useEffect(() => {
        setTimeStart(new Date(new Date().setHours(new Date().getTimezoneOffset() / -60, 0, 0, 0)))
        setTimeEnd(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)))
    }, [])

    const handleDayButtonClick = () => {
        const timeStart1 = new Date(new Date().setHours(new Date().getTimezoneOffset() / -60, 0, 0, 0)).toISOString()
        const timeEnd1 = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString()
        props.getLogs(timeStart1, timeEnd1)
    }

    const handleChosenTimeClick = () => {
        props.getLogs(timeStart.toISOString(), timeEnd.toISOString())
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleDayButtonClick}>
                Сутки
            </Button>
            <Button variant="outlined" onClick={handleChosenTimeClick}>
                Выбранное время
            </Button>
            from <CustomTimePicker date={timeStart} setDate={setTimeStart} />
            to <CustomTimePicker date={timeEnd} setDate={setTimeEnd} />

            <Select
                value={selectedType}
                onChange={(event: SelectChangeEvent<number>) => dispatch(setType(Number(event.target.value)))}
            >
                    <MenuItem value={0}>Технология</MenuItem>)
                    <MenuItem value={1}>Устройства</MenuItem>)
                    <MenuItem value={2}>Двери и лампы</MenuItem>)
            </Select>
        </div>
    )
}

export default AppBar;