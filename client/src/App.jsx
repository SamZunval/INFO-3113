import { useState } from "react";

import {
  Snackbar
} from "@mui/material";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx"; 
import Register from './components/SignUp.jsx';
import Profile from './components/Profile.jsx';
import Love from './components/Love.jsx';
// import Display from './components/DisplayPage.jsx';

import Date from './components/Date.jsx'
import DatingSurvey from './components/DatingSurvey.jsx'
import Matches from "./components/Matches.jsx";
import { Navigate } from "react-router-dom";
import Search from './components/Search.jsx';
import Payment from './components/Payment.jsx';
import DisplayUser from "./components/DisplayUser.jsx";
import "./App.css";
import Header from "./components/Header.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

  const ProtectedRoute = ({ children }) => {
      if (!sessionStorage.getItem("userInfo")) {
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

        <Route path="/Love" element={<DisplayUser />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Payment" element={<Payment />} />
                {/* <Route path="/Display" element={<Display />} /> */}

        <Route path="/Love" element={<Love />} />

         <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        <Route
            path="/date"
            element={
              <ProtectedRoute>
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
