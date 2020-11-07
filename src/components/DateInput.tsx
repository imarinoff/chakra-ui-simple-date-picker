import * as React from "react";
import {
  Input, InputGroup, InputRightElement, InputProps, PropsOf, InputLeftElement,
} from "@chakra-ui/core";
import { useDateInput } from "../hooks/useDateInput";

export interface IDateInputProps {
    inputValue?: Date
    onFocus?: (e: FocusEvent) => void
    onBlur?: (e: FocusEvent) => void
    onChange: (value: string) => void
    label?: string
    inputFIeldProps?: InputProps
    inputRightElementProps?: PropsOf<typeof InputRightElement>
    inputLeftElementProps?: PropsOf<typeof InputLeftElement>
    isFocused: boolean
}

function DateInputRenderer(props: IDateInputProps) {
  const inputProps = useDateInput(props);
  return (
    <InputGroup>
      <Input {...props.inputFIeldProps} {...inputProps} />
      <InputRightElement {...props.inputRightElementProps} children={inputProps.icon} />
      <InputLeftElement {...props.inputLeftElementProps} />
    </InputGroup>
  );
}

export const DateInput = React.forwardRef(DateInputRenderer);
