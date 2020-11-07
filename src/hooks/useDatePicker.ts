import * as React from "react";
import {useState} from "react";
import {IDatepickerProps, TDateFormat} from "../components/Datepicker";
import {DatePickerDefaultProps} from "../const/defaults";

const merge = require("lodash.merge")

export interface IUseDatePickerProps {
    dateFromState: Date
    selectDay: (date: Date) => void
    isOpen: boolean
    open: () => void
    close: () => void
    DatePickerContext: React.Context<IDatePickerContext>
    DatePickerContextValue: IDatePickerContext
    DatePickerProps: IDatepickerProps
    isFocused: boolean
    inputButtonOnClick: (e: MouseEvent) => void
}
export interface IDatePickerContext {
    format: TDateFormat
    locale: string
}
const DefaultDatePickerContextValue: IDatePickerContext = {
    format: "ISO-8601",
    locale: navigator.language
}
export const DatePickerContext = React.createContext<IDatePickerContext>(DefaultDatePickerContextValue)

export function useDatePickerContext() {
    return React.useContext<IDatePickerContext>(DatePickerContext)
}

export function useDatePicker(props: IDatepickerProps): IUseDatePickerProps {
    const [dateFromState, setDate] = useState<Date>(props.value ?? new Date())
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    const selectDay = (date: Date) => {
        close()
        setDate(date)
    }

    const DatePickerContextValue: IDatePickerContext = {
        format: props.format ?? DefaultDatePickerContextValue.format,
        locale: props.locale ?? DefaultDatePickerContextValue.locale
    }
    const inputButtonOnClick = (_e: MouseEvent) => {
        setIsFocused(true)
    }

    return {
        dateFromState,
        selectDay,
        isOpen,
        open,
        close,
        DatePickerContext,
        DatePickerContextValue,
        DatePickerProps: merge(DatePickerDefaultProps, props),
        isFocused,
        inputButtonOnClick
    }
}
export function formatDate(day: Date | undefined) {
    if(!day) return undefined
    const ctx = useDatePickerContext()
    if(ctx.format === "ISO-8601") {
        return day.toJSON().split("T")[0]
    }
    return day.toLocaleString(ctx.locale, { dateStyle: ctx.format })
}