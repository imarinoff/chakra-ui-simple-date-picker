import {IDatepickerProps} from "../components/Datepicker";
import {ButtonProps} from "@chakra-ui/core"

const fontFamily = "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
const calendarCellSize = {
    width: "40px",
    minWidth: "40px",
    height: "40px"
}
const calendarCellAlignment = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"

}
const calendarCellFont = {
    fontSize: "sm",
    fontWeight: "normal",
    fontFamily: fontFamily
}
const calendarDayProps: ButtonProps = {
    sx: {
        border: "none",
        background: "white",
        ...calendarCellFont
    },
    p: 0,
    ...calendarCellSize,
    ...calendarCellAlignment

}

export const DatePickerDefaultProps: IDatepickerProps = {
    value: new Date(),
    format: "ISO-8601",
    locale: navigator.language,
    inputProps: {
        label: "Select Date",
        inputLeftElementProps: {},
        inputRightElementProps: {},
        inputFIeldProps: {

        }
    },
    calendarProps: {
        weekDayNamesProps: {
            ...calendarCellSize,
            ...calendarCellFont,
            ...calendarCellAlignment,
            fontWeight: "bold"
        },
        daysNotFromSelecedMonthProps: {
            ...calendarDayProps,
            color: "#999"
        },
        enabledDaysProps: {
            ...calendarDayProps
        },
        weekendDaysProps: {
            ...calendarDayProps,
            color: "#ff0000"
        },
        disabledDaysProps: {
            ...calendarDayProps,
            color: "#ccc"
        },
        specialDaysProps: {
            ...calendarDayProps,
            color: "#ff0000"
        },
        weekDaysProps: {
            ...calendarDayProps,
        },
        headerProps: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            fontFamily: fontFamily,
            fontWeight: "bold"
        },
        prevNextButtonsProps: {
            border: "none",
            background: "white",
            color: "#999"
        }
    }
}