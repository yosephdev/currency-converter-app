import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Routing from "./components/Routing";
import "./styles/style.css";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#03a9f4',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#212121',
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="gradient-background">
        <Routing />
      </div>
    </ThemeProvider>
  );
}

export default App;