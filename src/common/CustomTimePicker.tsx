import React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {TextField} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";

function CustomTimePicker(props: { date: Date, setDate: Function | null}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                ampm={false}
                value={props.date}
                onChange={(newValue) => {
                    if (props.setDate) props.setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}

export default CustomTimePicker