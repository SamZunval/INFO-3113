import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  IconButton

} from "@mui/material";

import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";



const Header = (props) => {

 const [anchor, setAnchor] = useState(null);

 const navigate = useNavigate();

 return (<>
  
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {props.appTitle}
        </Typography>
        <div style={{ flex: 1 }} />
        <Button style={{ color: "#fffefe" }} onClick={() => navigate("/login")} >Login</Button>
        <Button style={{ color: "#fffefe" }} onClick={() => navigate("/signin")} >Sign In </Button>
        <IconButton style={{ color: "#fffefe" }} onClick={e => setAnchor(e.target)}>
        <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}  
        PaperProps={{sx: {backgroundColor: "#f680dc", color: "#fffefe",minWidth: "250px"},
        }}
         >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Date</MenuItem>
          <MenuItem>Love</MenuItem>
          <MenuItem>Member Renew/Become</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>

        </Menu>
      </Toolbar >
    </AppBar >
  </>);
};

export default Header;
