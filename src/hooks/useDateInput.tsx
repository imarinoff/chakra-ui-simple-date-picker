import {CalendarIcon} from "../assets/icons-calendar";
import {CalendarIconFocus} from "../assets/icons-calendar-focus";
import * as React from "react";
import {IDateInputProps} from "../components/DateInput";
import {formatDate} from "./useDatePicker";

const Icon = <CalendarIcon/>
const IconFocus = <CalendarIconFocus/>

export interface IUseDateInputProps {
    onFocus?: (e: FocusEvent) => void
    onBlur?: (e: FocusEvent) => void
    onChange?: (value: string) => void
    placeholder: string,
    value: string,
    icon: JSX.Element
}

export function useDateInput (props: IDateInputProps): IUseDateInputProps {

    const [icon, setIcon] = React.useState<JSX.Element>(Icon)
    const onFocus = (e: FocusEvent) => {
        setIcon(IconFocus)
        if(typeof props.onFocus === "function") {
            props.onFocus(e)
        }
    }
    const onBlur = (e: FocusEvent) => {
        setIcon(Icon)
        if(typeof props.onBlur === "function") {
            props.onBlur(e)
        }
    }
    const onChange = (value: string) => {
        if(props.onChange && typeof props.onChange === "function") {
            props.onChange(value)
        }
    }
    const value = formatDate(props.inputValue)
    const placeholder = props.label

    return {
        onFocus,
        onBlur,
        placeholder,
        value,
        icon,
        onChange
    }
}
