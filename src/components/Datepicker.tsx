import * as React from "react"
import {DateInput, IDateInputProps} from "./DateInput";
import {Calendar, ICalendarProps} from "./Calendar";
import {useDatePicker} from "../hooks/useDatePicker";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Portal,
    Button
} from "@chakra-ui/core"
export type TDateFormat = "full" | "long" | "medium" | "short" | "ISO-8601"
export interface IDatepickerProps {
    value?: Date
    format?: TDateFormat
    locale?: string //TODO how to pass the locale to all other components
    inputProps?: IDateInputProps
    calendarProps?: ICalendarProps
    onChange: (value: string) => void
}
function DatePickerRenderer(props: IDatepickerProps) {
    const {
        dateFromState,
        selectDay,
        isOpen,
        open,
        close,
        DatePickerContext,
        DatePickerContextValue,
        DatePickerProps,
    } = useDatePicker(props)
    return (
        <DatePickerContext.Provider value={DatePickerContextValue}>
            <Popover isOpen={isOpen} onClose={close} closeOnBlur={false} placement={"bottom-end"}>
                <PopoverTrigger>
                    <Button onClick={(e:MouseEvent) => e.preventDefault()} sx={{width: "100%", background: "none", p: 0, border: 0, _hover: {background: "none"}, _active: {background: "none"}}}>
                        <DateInput {...DatePickerProps.inputProps} onFocus={open} inputValue={dateFromState} onChange={props.onChange}/>
                    </Button>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent w={290}>
                        <Calendar
                            {...DatePickerProps.calendarProps}
                            value={dateFromState}
                            selectDay={selectDay}
                        />
                    </PopoverContent>
                </Portal>
            </Popover>
        </DatePickerContext.Provider>
    );

}

export const DatePicker = React.forwardRef<HTMLDivElement, IDatepickerProps>(DatePickerRenderer)
