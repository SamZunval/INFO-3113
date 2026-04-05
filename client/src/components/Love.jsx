import {useState,useEffect } from "react";
import {
  Paper,
  Box,
  Typography
} from "@mui/material";
import * as api from "../util/api"; 

const Love = () => {
  const [usermarks, setusermarks] = useState([]);

  useEffect(() => {
          const loadMatches = async () => {
              let username = JSON.parse(sessionStorage.getItem("userInfo")).userName;
              //console.log("username: " + username);
              let result = await api.users.getMatches(username);
              setusermarks(result);
          }
          loadMatches();
      }, []);
    const handleContact = async () => {
      await api.stats.updateCount();//todo: actualy handle hiding and unhiding div
    }
    const handleBlock = async (username) => {
      let user = JSON.parse(sessionStorage.getItem("userInfo")).userName;
      await api.users.blockUser(user,username);
    }
  //if (!usermarks) return <></>;

  return (
    <Box sx={{ maxWidth: 700, margin: "2rem auto",color: "#f680dc"}}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Matches
      </Typography>

      {usermarks.map((user) => (
        <Paper key={user._id}  elevation={4}   sx={{ marginBottom: 6, padding: 2 }}
        >
          <div style={{ fontSize: "28px" }}>
            {user.userName}
          </div>

          <div key={user._id + "contact"} style={{ fontSize: "20px" }}>
            {user.email}
          </div>

          <div style={{ fontSize: "18px", marginTop: "10px" }}>
            {user.firstName} {user.lastName}
          </div>

          <div style={{ fontSize: "15px", marginTop: "10px" }}>
            {user.city}, {user.province}
          </div>

          <div style={{ fontSize: "15px", marginTop: "10px" }}>
            {user.address}, {user.postalCode}
          </div>

          <div style={{ fontSize: "15px", marginTop: "10px" }}>
            Birthday: {user.birthDay}
          </div>
          <Button fullWidth variant="contained" 
                              onClick={handleContact}
                          >
                              Display Contact Information
          </Button>
          <Button fullWidth variant="contained" 
                              onClick={handleBlock(user.userName)}
                          >
                              Block user
          </Button>
        </Paper>
      ))}
    </Box>
  );
};

export default Love;
