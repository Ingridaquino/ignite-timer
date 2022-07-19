import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./@types/global";
import { Button } from "./Components/Button";
import { defaultTheme } from "./styles/themes/default";

export function App() {

  return (
      <ThemeProvider theme={defaultTheme}>
        <Button variant="primary"/>
        <Button variant="secondary"/>
        <Button variant="danger"/>
        <Button variant="success"/>


        <GlobalStyle />
      </ThemeProvider>
  )
}

