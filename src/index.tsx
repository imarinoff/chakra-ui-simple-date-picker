import * as React from "react";
import * as ReactDOM from "react-dom";
import { ThemeProvider, theme } from "@chakra-ui/core";
import { DatePicker } from "./components/Datepicker";

const App = () => <ThemeProvider theme={theme}>
    <DatePicker/>
</ThemeProvider>


ReactDOM.render(<App/>, document.getElementById("app"))
