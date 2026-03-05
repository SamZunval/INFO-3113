import { useState, useEffect } from "react";
import {
    Paper,
    CardHeader,
    CardContent,
    Fab
} from '@mui/material';

import * as api from "../util/api"
import logo from "../assets/earth.png";
import Search from "./Search";
import Alert from "./Alert";

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'; // Border - Unbookmarked status (default)
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Home = (props) => {
    
    const [alerts, setAlerts] = useState([]);
    const [bookmarked, setBookmarked] = useState();
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
    const [selectedAlert, setSelectedAlert] = useState();
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
    
    return (<>
        <Paper elevation={4} sx={{ marginTop: "0.5em" }}>
            <img src={logo} style={{ width: "40%", maxWidth: "200px", margin: "1em" }} />
            <CardHeader title="Travel Alerts" />
            <CardContent>
                <Search alerts={alerts} onSelection={async (result) => {
                    if(result == null){
                        setSelectedAlert(result)
                    }
                    else{
                        setSelectedAlert(await api.alerts.getCountryData(result.country_code));
                    }
                    
            }} />
            </CardContent>
        </Paper>
        <Alert alert={selectedAlert} />
        {selectedAlert != null &&
        <Fab color="primary" aria-label="bookmark" sx={{ zIndex: 100, border: "2px solid #e1e1e1", position: "absolute", bottom: "1em", right: "1em" }}onClick={bookmark}>
            {
                bookmarked
            }
        </Fab>
        }
    </>);
};

export default Home;