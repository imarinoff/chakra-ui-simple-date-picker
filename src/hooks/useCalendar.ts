import * as React from "react";
import {ICalendarProps} from "../components/Calendar";

interface IUseCalendarProps {
    selectedMonthName: string
    selectedMonth: number
    selectedYear: number
    prevMonth: (e: MouseEvent) => void
    nextMonth: (e: MouseEvent) => void
    weekdaysNames: string[],
    dates: Date[]
}

export function useCalendar(props: ICalendarProps): IUseCalendarProps {
    const currentDate = props.value ?? new Date()
    const [period, setPeriod] = React.useState<{month: number, year: number}>({month: currentDate.getMonth()+1, year: currentDate.getFullYear()})
    const calendarData = getCalendarData(period)
    const prevMonth = (_e: MouseEvent) => setPeriod(calendarData.prevPeriod)
    const nextMonth = (_e: MouseEvent) => setPeriod(calendarData.nextPeriod)
    return {
        selectedMonthName: calendarData.selectedMonthName,
        selectedMonth: calendarData.selectedMonth,
        selectedYear: calendarData.selectedYear,
        prevMonth,
        nextMonth,
        weekdaysNames: calendarData.weekdaysNames,
        dates: calendarData.dates
    }
}

interface IPeriodDef {
    month: number
    year: number
}
interface ICalendarData {
    weekdaysNames: string[]
    dates: Date[]
    allMonths: string[]
    selectedMonth: number
    selectedYear: number
    selectedMonthName: string
    nextPeriod: IPeriodDef
    prevPeriod: IPeriodDef
}

export function getCalendarData({month, year}: IPeriodDef): ICalendarData {
    const weekStarts = 1
    const weekEnds = 0
    const firstDayOfMonth = new Date(`${year}-${month}-01`)
    const lastDayOfMonth = new Date(year, month, 0)
    let firstDayOfCalendar = firstDayOfMonth
    let lastDayOfCalendar = lastDayOfMonth
    if(firstDayOfMonth.getDay() !== weekStarts) {
        while (firstDayOfCalendar.getDay() !== weekStarts) {
            firstDayOfCalendar = new Date(firstDayOfCalendar.getTime() - 3600000*24)
        }
    }
    if(lastDayOfCalendar.getDay() !== weekEnds) {
        while (lastDayOfCalendar.getDay() !== weekEnds) {
            lastDayOfCalendar = new Date(lastDayOfCalendar.getTime() + 3600000*24)
        }
    }
    const dates = []
    let day = firstDayOfCalendar
    while(compareDates(day, lastDayOfCalendar) === -1) {
        dates.push(day)
        day = new Date(day.getTime() + 3600000*24)
    }
    dates.push(lastDayOfCalendar)
    const weekdaysNames = dates.slice(0, 7).map(d => d.toLocaleDateString(navigator.language, { weekday: 'short' }))
    const allMonths = getAllMonths()

    return {
        weekdaysNames,
        dates,
        allMonths,
        selectedMonth: month,
        selectedMonthName: allMonths[month-1],
        selectedYear: year,
        nextPeriod: getNextPeriod(month, year),
        prevPeriod: getPrevPeriod(month, year)
    }
}
function getAllMonths(): string[] {
    const months = []
    for(let i = 0; i < 12; i++){
        months.push(new Date(2020, i, 15).toLocaleDateString(navigator.language, { month: 'long' }))
    }
    return months
}
function getNextPeriod(month: number, year: number) {
    let nextMonth = month + 1
    let nextYear = year
    if(nextMonth > 12) {
        nextMonth = 1
        nextYear = year + 1
    }
    return {month: nextMonth, year: nextYear}
}
function getPrevPeriod(month: number, year: number) {
    let nextMonth = month - 1
    let nextYear = year
    if(nextMonth < 1) {
        nextMonth = 12
        nextYear = year - 1
    }
    return {month: nextMonth, year: nextYear}
}
function compareDates(date1:Date, date2:Date): number {
    const str1 = date1.toJSON().split("T")[0]
    const str2 = date2.toJSON().split("T")[0]
    return str1.localeCompare(str2)
}
export interface IUseDayProps extends ICalendarProps{
    day: Date,
    selectedMonth: number
}
export function isWeekendDay(day: Date) {
    return [0,6].includes(day.getDay())
}
export function useDayProps(props: IUseDayProps) {
    const {day, selectedMonth, disabledDays, specialDays} = props
    const disabled = disabledDays && Array.isArray(disabledDays) && disabledDays.find(d => compareDates(day, d) === 0)
    const special = specialDays && Array.isArray(specialDays) && specialDays.find(d => compareDates(day, d) === 0)
    const weekend = isWeekendDay(day)
    const isNotFromSelectedMonth = day.getMonth() + 1 !== selectedMonth

    if(disabled) {
        return props.disabledDays
    }
    if(isNotFromSelectedMonth) {
        return props.daysNotFromSelecedMonthProps
    }
    if(weekend) {
        return props.weekendDaysProps
    }
    if(special) {
        return props.specialDaysProps
    }
    return props.enabledDaysProps
}
