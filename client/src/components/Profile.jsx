import { useState } from "react";
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Divider, 
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip
} from "@mui/material";

import { 
    IconButton, 
    InputAdornment 
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import * as api from "../util/api";

const Profile = () => {
   //Gets all user data 
  const getUser = () => {
    const stored = sessionStorage.getItem("userInfo");
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  };
  //User information
  const userData = getUser();
  const [userName, setUserName] = useState(userData?.userName || "");
  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [city, setCity] = useState(userData?.city || "");
  const [career, setCareer] = useState(userData?.career || "");
  const [college, setCollege] = useState(userData?.college || "");

  const [traits, setTraits] = useState([]);

  //Password information?
  const [currentPassword, setCurrentPassword] = useState(userData?.password || "");
  const [newPassword, setNewPassword] = useState("");        
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [savedUser, setSavedUser] = useState(null);

  //Trait list and method for dealing with trait list
  const traitsList = [
    "Object-Oriented Thinker",
    "Functional Programming Fan",
    "Data Structures Expert",
    "API Builder",
    "Database Designer",
    "Cloud Curious",
    "Security Minded",
    "Performance Optimizer",
    "Test Driven Developer",
    "Agile Team Player"
  ]
  
  const handleMultiple = (e) => {
      const {
         target: { value },
      } = e;
      setTraits(
         typeof value === "string" ? value.split(",") : value
      );
   };


const passwordVisibility = (field) => {
  if (field === "current") setShowCurrentPassword(!showCurrentPassword);
  if (field === "new") setShowNewPassword(!showNewPassword);
  if (field === "confirm") setShowConfirmPassword(!showConfirmPassword);
};

  const handleSave = async () => {
    // if (!savedUser) {
    //   alert("No user session found.");
    //   return;
    // }

    if(newPassword.length > 0 || confirmPassword.length > 0)
    {
      if (currentPassword !== userData.password)
      {
        alert("The current password you entered is incorrect. Changes not saved.");
        return;
      }

      if (newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          alert("The new passwords do not match.");
          return;
        }
        if (newPassword === userData.password) {
          alert("The new password cannot be the same as the current one.");
          return;
        }
      }

    }
    
    const updatedUser = {
      ...userData,
      userName,
      firstName,
      lastName,
      email,
      city,
      career,
      college,
      password: newPassword ? newPassword : userData.password,
      traits,
    };

    console.log("[Profile Update] Sending updated data to server:", updatedUser);

    try {
      const response = await api.users.updateUser(updatedUser);
      if (response.ok) {
        sessionStorage.setItem("userInfo", JSON.stringify(updatedUser));
        setSavedUser(updatedUser);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile on the server.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while saving.");
    }
  };

  return (
    <Box>
      <Paper>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Username" variant="outlined" fullWidth value={userName} 
          onChange={(e) => setUserName(e.target.value)}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField label="First Name" fullWidth value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField label="Last Name" fullWidth value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>

          <TextField label="Email" fullWidth value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField label="City" fullWidth value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField label="Career" fullWidth value={career}
            onChange={(e) => setCareer(e.target.value)}
          />
          <TextField label="College" fullWidth value={college}
            onChange={(e) => setCollege(e.target.value)}
          />

          <FormControl
               variant="standard"
               size="large"
               sx={{ m: 1, minWidth: 120 }}
               >
               <InputLabel id="select" label="Lang">
                  Select
               </InputLabel>
               <Select
                  multiple
                  value={traits}
                  onChange={handleMultiple}
                  renderValue={(selLang) => (
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selLang.map((value) => (
                           <Chip key={value} color="#FFC0CB" label={value} />
                        ))}
                     </Box>
                  )}
                  >
                  {traitsList.map((lang) => (
                     <MenuItem key={lang} value={lang}>
                        {lang}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>

          <Divider sx={{ my: 3 }}>
            <Typography color="textSecondary">Security & Password</Typography>
          </Divider>

          <TextField fullWidth label="Current Password" type={showCurrentPassword ? "text" : "password"} value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            helperText="Enter your current password to verify"
            InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => passwordVisibility("current")}
                                    edge="end"
                                >
                                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={newPassword !== "" && newPassword === savedUser?.password}
              helperText={
                newPassword !== "" && newPassword === savedUser?.password
                  ? "New password must differ from current"
                  : ""
              }
               InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => passwordVisibility("new")}
                      edge="end"
                      >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPassword !== "" && newPassword !== confirmPassword}
              helperText={
                confirmPassword !== "" && newPassword !== confirmPassword
                  ? "Passwords don't match"
                  : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => passwordVisibility("confirm")}
                      edge="end"
                      >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSave}
            sx={{ backgroundColor: "#f680dc", "&:hover": { backgroundColor: "#d46bb8" } }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
