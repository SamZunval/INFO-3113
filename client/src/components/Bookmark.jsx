import { useState, useEffect } from "react";
import {
    Paper,
    CardHeader
} from '@mui/material';

import * as api from "../util/api"
import Alert from "./Alert";

const Bookmark = (props) => {
    
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const loadBookmarks = async () => {
            let result = await api.util.getBookmarks();
            setBookmarks(result);
            props.log(`${result.length} bookmarks loaded`);
        }
        loadBookmarks();
    }, []);
    return (<>
        <Paper elevation={4} sx={{ marginTop: "0.5em" }}>
            <CardHeader title="Bookmarks" />
        </Paper>
        <>
            {bookmarks.map(function(object,i){
 	           return <Alert alert={object} key={i}/> 
	         })}
        </>
    </>);
};

export default Bookmark;