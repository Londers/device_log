import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import CustomTimePicker from "../common/CustomTimePicker";

function AppBar(props: { getLogs: Function }) {
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
        </div>
    )
}

export default AppBar;