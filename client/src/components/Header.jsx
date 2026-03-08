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

import MenuIcon from "@mui/icons-material/Menu";



const Header = (props) => {

 const [anchor, setAnchor] = useState(null);

 return (<>
  
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {props.appTitle}
        </Typography>
        <div style={{ flex: 1 }} />
        <Button style={{ color: "#fffefe" }}>Login</Button>
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
