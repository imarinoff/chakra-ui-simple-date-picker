import * as React from "react";
import {Box, BoxProps, Button, HStack, SimpleGrid, SimpleGridProps, VStack, ButtonProps, StackProps} from "@chakra-ui/core"
import {useCalendar, useDayProps} from "../hooks/useCalendar";

export interface ICalendarProps {
  value?: Date
  selectDay: (date: Date) => void
  enabledDaysProps?: ButtonProps
  disabledDays?: Date[] //TODO: disabled days?? how to do it
  specialDays?: Date[]
  disabledDaysProps?: ButtonProps
  daysNotFromSelecedMonthProps?: ButtonProps
  activeDayPropss?: ButtonProps
  prevNextButtonsProps?: ButtonProps
  prevButtonProps?: ButtonProps
  prevButtonChildren?: ButtonProps
  nextButtonProps?: ButtonProps
  nextButtonChildren?: ButtonProps
  weekDaysProps?: ButtonProps
  weekendDaysProps?: ButtonProps
  holidayDaysProps?:ButtonProps
  specialDaysProps?: ButtonProps
  containerProps?: StackProps
  headerProps?: StackProps
  headerMonthProps?: BoxProps
  headerYearProps?: BoxProps
  gridProps?: SimpleGridProps
  weekDayNamesProps?: BoxProps
}

export const Calendar: React.FC<ICalendarProps> = (props: ICalendarProps) => {
  const {prevNextButtonsProps, prevButtonProps,nextButtonProps} = props
  const {selectedMonthName, selectedMonth, selectedYear, prevMonth, nextMonth, dates, weekdaysNames}  = useCalendar(props)
  return <VStack {...props.containerProps}>
    <HStack {...props.headerProps}>
      <Button {...prevNextButtonsProps} {...prevButtonProps} onClick={prevMonth}>&#5176;</Button>
      <HStack>
        <Box>{selectedMonthName}</Box>
        <Box>{selectedYear}</Box>
      </HStack>

      <Button {...prevNextButtonsProps} {...nextButtonProps} onClick={nextMonth}>&#5171;</Button>
    </HStack>
    <SimpleGrid {...props.gridProps} columns={7}>
      {weekdaysNames.map((wn, i: number) => <Box key={`wkd-${i}`} {...props.weekDayNamesProps}>{wn}</Box>)}
      {dates.map((day, i: number) => {
        const dayProps = useDayProps({...props, day, selectedMonth })
        return <Box key={`day-${i}`}><Button {...dayProps} onClick={()=>props.selectDay(day)}>{day.getDate()}</Button></Box>
      })}
    </SimpleGrid>
  </VStack>

}


