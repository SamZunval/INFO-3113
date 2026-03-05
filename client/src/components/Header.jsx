import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import * as api from "../util/api"
import Home from "./Home"
import Bookmark from "./Bookmark";
const Header = (props) => {

  const [anchor, setAnchor] = useState(null);
  const [page, setPage] = useState(window.location.pathname);
  let refreshDatabase = async () => {
    try {
      let result = await api.util.refreshDatabase();
      if (result.ok) {
        window.location.reload(); // Forces a page refresh
        props.log('Database refreshed');
        
      }
    }
    catch (e) {
      console.error(e.message);
      props.log(e.message);
    }
  }

  return (<>
  <BrowserRouter>
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h6">
          {props.appTitle}
        </Typography>
        <IconButton color="inherit" onClick={e => setAnchor(e.target)}>
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
          <MenuItem onClick={
            async () => {
              setAnchor(null);
              await refreshDatabase();
            }
          }>Refresh Database</MenuItem>
          {page != "/" &&
          <MenuItem onClick={async() => await setPage("/")} component={"a"} href={"/"}>
          Home</MenuItem>
          }
          {page != "/bookmark" &&
          <MenuItem onClick={async() => await setPage("/bookmark")} component={"a"} href={"/bookmark"}>
          Bookmarks</MenuItem>
          }
        </Menu>
      </Toolbar >
    </AppBar >
    <Routes>
        <Route path="/" element={<Home log={props.log}/>} />
        <Route path="/bookmark" element={<Bookmark log={props.log}/>} />
    </Routes>
    </BrowserRouter>
  </>);
};

export default Header;