import { useState } from "react";
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Divider 
} from "@mui/material";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [career, setCareer] = useState("");
  const [college, setCollege] = useState("");

  const handleSave = (e) => {
    
  };

  return (
    <Box>
      <Paper>

        <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField 
              label="Username" 
              variant="outlined" 
              fullWidth 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField 
                label="First Name" 
                fullWidth 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
              />
              <TextField 
                label="Last Name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
              />
            </Box>

            <TextField 
              label="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />

            <TextField 
              label="City"  
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
            />

            <TextField 
              label="Career" 
              value={career} 
              onChange={(e) => setCareer(e.target.value)} 
            />

            <TextField 
              label="College" 
              value={college} 
              onChange={(e) => setCollege(e.target.value)} 
            />

            <Button fullWidth variant="contained" 
                    sx={{ backgroundColor: "#f680dc", "&:hover": { backgroundColor: "#d46bb8" } }} >
              Save Changes
            </Button>
          </Box>
      </Paper>
    </Box>
  );
};

export default Profile;