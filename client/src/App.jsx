import { useState } from "react";

import {
  Snackbar
} from "@mui/material";
import Home from "./components/Home.jsx";
import Bookmark from "./components/Bookmark";
import "./App.css";

import Header from "./components/Header.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
function App() {

  // Snackbar State & Functions
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const closeSnackbar = () => setSnackbarVisible(false);
  const openSnackbar = (text) => {
    setSnackbarMessage(text);
    setSnackbarVisible(true);
  }
  
const theme = createTheme({
  palette: {
    primary: {
      main: "#f680dc"
    },

  text:{
    primary: "#3d0f3e"
      }
  }
 
});
  
  return (<ThemeProvider theme={theme}>
    <Header appTitle="P1 c_tidy" log={openSnackbar} />
    <Snackbar
    sx={{zIndex: 99}}
      open={snackbarVisible}
      autoHideDuration={5000}
      onClose={closeSnackbar}
      message={snackbarMessage}
    />
  </ThemeProvider>);
};

export default App;
