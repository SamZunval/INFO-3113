import { useState } from "react";

import {
  Snackbar
} from "@mui/material";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx"; 
import Register from './components/SignUp.jsx';
import Profile from './components/Profile.jsx';
import Date from './components/Date.jsx'
import DatingSurvey from './components/DatingSurvey.jsx'
import Matches from "./components/Matches.jsx";
import { Navigate } from "react-router-dom";


import "./App.css";

import Header from "./components/Header.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

  const isLoggedIn = !!sessionStorage.getItem("userName");
  const ProtectedRoute = ({ isAllowed, children }) => {
      if (!isAllowed) {
          alert("Please log in to access this page.");
          return <Navigate to="/signup" replace />;
      }

      return children;
  };

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
        <Route path="/signup" element={<Register />} />
        <Route path="/matches" element={<Matches />} />
        <Route
            path="/profile"
            element={
              <ProtectedRoute isAllowed={isLoggedIn}>
                <Profile />
              </ProtectedRoute>
            }
          />
        <Route
            path="/Date"
            element={
              <ProtectedRoute isAllowed={isLoggedIn}>
                <Date />
              </ProtectedRoute>
            }
          />
        <Route path="/DatingSurvey" element={<DatingSurvey />} />
      </Routes>
       <div className="background"></div>

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
