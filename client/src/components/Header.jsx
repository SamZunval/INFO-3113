import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  IconButton,
  

} from "@mui/material";

import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";



const Header = (props) => {

 const [anchor, setAnchor] = useState(null);

 const handleMenuClick = (path) => {
    if (!sessionStorage.getItem("userInfo")) {
      alert("Please log in to access this page.");
      setAnchor(null);
      return;
    }
    navigate(path);
    setAnchor(null); 
  };
  const adminOnly = () => {
    if (!sessionStorage.getItem("userInfo")) {
      return false;
    }
    if(JSON.parse(sessionStorage.getItem("userInfo")).member === "Admin"){
      return true;
    }
    return false
  }
  const paidOnly = () => {
    if (!sessionStorage.getItem("userInfo")) {
      return false;
    }
    if(JSON.parse(sessionStorage.getItem("userInfo")).member === "Paid"){
      return true;
    }
    return false
  }
  const handleLogout = () => {
    sessionStorage.clear(); // removes EVERYTHING from session storage
    setAnchor(null);
    navigate("/login"); 
  };

 const navigate = useNavigate();

 return (<>
  
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {props.appTitle}
        </Typography>
        <div style={{ flex: 1 }} />
        <Button style={{ color: "#fffefe" }} onClick={() => navigate("/login")} >Login</Button>
        <Button style={{ color: "#fffefe" }} onClick={() => navigate("/signup")} >Sign Up </Button>
        <IconButton style={{ color: "#fffefe" }} onClick={e => setAnchor(e.target)}>
        <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}  
        PaperProps={{sx: {backgroundColor: "#f680dc", color: "#fffefe",minWidth: "250px"},
        }}
         >
          <MenuItem onClick={() => handleMenuClick("/Profile")}>Profile</MenuItem>
          {paidOnly() &&
          <MenuItem onClick={() => handleMenuClick("/swipe")}>Swipe</MenuItem>
          }
          {paidOnly() &&
          <MenuItem onClick={() => handleMenuClick("/Date")}>Date</MenuItem>
          }
          <MenuItem onClick={() => handleMenuClick("/DisplayUser")}>UserProfile</MenuItem>
          {paidOnly() &&
          <MenuItem onClick={() => handleMenuClick("/Search")}>Search</MenuItem>
          }
          <MenuItem onClick={() => handleMenuClick("/Payment")}>Payment</MenuItem>
          {paidOnly() &&
          <MenuItem onClick={() => handleMenuClick("/Loves")}>Matches</MenuItem>
          }

          {adminOnly() &&
            <MenuItem onClick={() => handleMenuClick("/Dashboard")}>Management Dashboard</MenuItem>
          }
          <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>

        </Menu>
      </Toolbar >
    </AppBar >
  </>);
};

export default Header;