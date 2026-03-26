import { useState, useEffect } from "react";
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
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [career, setCareer] = useState("");
  const [college, setCollege] = useState("");

  const language = ["Java", "Python", "C++", "JavaScript", "SQL"];
  const [tester, setTester] = useState([]);
const handleMultiple = (e) => {
      const {
         target: { value },
      } = e;
      setTester(
         typeof value === "string" ? value.split(",") : value
      );
   };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");        
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [savedUser, setSavedUser] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem("userInfo");
    if (user) {
      const userData = JSON.parse(user);
      setSavedUser(userData);
      setUserName(userData.userName || "");
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setEmail(userData.email || "");
      setCity(userData.city || "");
      setCareer(userData.career || "");
      setCollege(userData.college || "");
    }
  }, []);

const passwordVisibility = (field) => {
  if (field === "current") setShowCurrentPassword(!showCurrentPassword);
  if (field === "new") setShowNewPassword(!showNewPassword);
  if (field === "confirm") setShowConfirmPassword(!showConfirmPassword);
};

  const handleSave = async () => {
    if (!savedUser) {
      alert("No user session found.");
      return;
    }

    if (currentPassword !== savedUser.password)
    {
      alert("The current password you entered is incorrect. Changes not saved.");
      return;
    }

    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        alert("The new passwords do not match.");
        return;
      }
      if (newPassword === savedUser.password) {
        alert("The new password cannot be the same as the current one.");
        return;
      }
    }

    const updatedUser = {
      ...savedUser,
      userName,
      firstName,
      lastName,
      email,
      city,
      career,
      college,
      password: newPassword ? newPassword : savedUser.password,
      tester,
    };

    console.log("[Profile Update] Sending updated data to server:", updatedUser);

    try {
      const response = await api.users.updateUser(updatedUser);
      if (response.ok) {
        sessionStorage.setItem("userInfo", JSON.stringify(updatedUser));
        setSavedUser(updatedUser);
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
                  value={tester}
                  onChange={handleMultiple}
                  renderValue={(selLang) => (
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selLang.map((value) => (
                           <Chip key={value} color="#FFC0CB" label={value} />
                        ))}
                     </Box>
                  )}
                  >
                  {language.map((lang) => (
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