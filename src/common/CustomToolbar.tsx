import * as React from 'react';
import {
    GridToolbarContainer,
    GridToolbarContainerProps,
    GridToolbarExportContainer,
    GridExportMenuItemProps,
    useGridApiContext,
    gridFilteredSortedRowIdsSelector,
    gridVisibleColumnFieldsSelector,
    GridApi, GridToolbarDensitySelector, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import {ButtonProps} from '@mui/material/Button';
import {useAppSelector} from "../app/hooks";
import {selectDevices, selectLogFileName} from "../features/deviceLogsSlice";

const XLSX = require("xlsx")

const getExcel = (apiRef: React.MutableRefObject<GridApi>, fileName: string) => {
    // Select rows and columns
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef)
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef)

    // Format the data. Here we only keep the value
    const data = filteredSortedRowIds.map((id) => {
        const row: Record<string, any> = {}
        visibleColumnsField.forEach((field) => {
            row[field] = apiRef.current.getCellParams(id, field).value
        });
        return row
    });
    data.unshift(visibleColumnsField)
    // console.log(data, visibleColumnsField)
    let wb = XLSX.utils.book_new()
    let ws = XLSX.utils.aoa_to_sheet(data.map(v => Object.values(v)))
    XLSX.utils.book_append_sheet(wb, ws, "ExcelSheet")
    XLSX.writeFile(wb, fileName)
    return
};

const ExcelExportMenuItem = (props: GridExportMenuItemProps<{}>) => {
    const apiRef = useGridApiContext()
    const fileName = useAppSelector(selectLogFileName)

    const {hideMenu} = props

    return (
        <MenuItem
            onClick={() => {
                getExcel(apiRef, fileName)
                // Hide the export menu after the export
                hideMenu?.()
            }}
        >
            Экспорт Excel
        </MenuItem>
    )
}

const CustomExportButton = (props: ButtonProps) => (
    <GridToolbarExportContainer {...props}>
        <ExcelExportMenuItem/>
    </GridToolbarExportContainer>
)

export default function CustomToolbar(props: GridToolbarContainerProps) {
    const devices = useAppSelector(selectDevices)

    return (
        <GridToolbarContainer {...props}>
            <GridToolbarColumnsButton/>
            <GridToolbarDensitySelector/>
            <CustomExportButton/>
            <GridToolbarQuickFilter quickFilterParser={valeu => {
                return true
            }}/>
        </GridToolbarContainer>
    )
}