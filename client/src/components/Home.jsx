import { useState, useEffect } from "react";
import {
    Paper,
    CardHeader,
    CardContent,
    Fab
} from '@mui/material';

import * as api from "../util/api"
import logo from "../assets/Cupid_Community.png";
import Search from "./Search";
import Alert from "./Alert";
import Login from "./Login";

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'; // Border - Unbookmarked status (default)
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Home = (props) => {
    
    const [alerts, setAlerts] = useState([]);
    const [bookmarked, setBookmarked] = useState();
    const [selectedAlert, setSelectedAlert] = useState();

    const handleJoinRoom = (data) => {
        props.log(`${data.userName} joined the room`);
    };

    useEffect(() => {
        const loadAlerts = async () => {
            let result = await api.alerts.getSearchData();
            setAlerts(result);
            props.log(`${result.length} alerts loaded`);
        }
        loadAlerts();
    }, []);
    let bookmark = async () => {
        try {
            let result = await api.util.getBookmark(selectedAlert.country_code);
            if(result == null){
                api.util.postBookmark(selectedAlert);
                setBookmarked(<BookmarkIcon />);
                props.log(`Bookmark added`);
            }
            else{
                api.util.removeBookmark(selectedAlert);
                setBookmarked(<BookmarkBorderIcon />);
                props.log("" + selectedAlert.country_name + " bookmark removed");
            }
        }
        catch (e) {
          console.error(e.message);
          props.log(e.message);
        }
    }
    
    useEffect(() => {
        let checkBookmark = async () =>{
        if(selectedAlert != null) {
            let result = await api.util.getBookmark(selectedAlert.country_code);
            if(result == null){
                setBookmarked(<BookmarkBorderIcon />);
            }
            else{
                setBookmarked(<BookmarkIcon />);
            }
        }
        else {
            setBookmarked(<BookmarkBorderIcon />);
        }
        } 
        checkBookmark(); 
    }, [selectedAlert]);
    
    return (
        <>
            <Paper elevation={4} sx={{ marginTop: "0.5em", paddingBottom: "1em" }}>
                <img src={logo} alt="Cupid Community Logo" style={{ width: "40%", maxWidth: "200px", margin: "1em" }} />
                
                <Login joinRoom={handleJoinRoom} error={null} />

            </Paper>
            
          
        </>
    );
};

export default Home;