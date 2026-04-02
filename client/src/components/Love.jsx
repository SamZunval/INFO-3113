import {useState } from "react";
import {
  Paper,
  Box,
  Typography
} from "@mui/material";

const Love = () => {
const [usermarks] = useState(() => {
  return JSON.parse(localStorage.getItem("usermarks")) || [];
});



  if (!usermarks) return <></>;

  return (
    <Box sx={{ maxWidth: 700, margin: "2rem auto",color: "#f680dc"}}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Love
      </Typography>

      {usermarks.map((user) => (
        <Paper key={user._id}  elevation={4}   sx={{ marginBottom: 6, padding: 2 }}
        >
          <div style={{ fontSize: "28px" }}>
            {user.userName}
          </div>

          <div style={{ fontSize: "20px" }}>
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
        </Paper>
      ))}
    </Box>
  );
};

export default Love;
