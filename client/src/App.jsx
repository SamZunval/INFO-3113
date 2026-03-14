import { useState } from "react";

import {
  Snackbar
} from "@mui/material";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx"; 
import Register from './components/SignIn.jsx';
import Profile from './components/Profile.jsx'


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
    
    <BrowserRouter>
      <Header appTitle="Cupid Community" log={openSnackbar} />
    
      <Routes>
        <Route path="/" element={<Home log={openSnackbar} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Snackbar
        sx={{zIndex: 99}}
        open={snackbarVisible}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </BrowserRouter>
    
  </ThemeProvider>);
};

export default App;