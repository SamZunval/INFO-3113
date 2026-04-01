
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
<<<<<<< HEAD
  Chip,
  IconButton, 
  InputAdornment 
=======
  Chip
>>>>>>> feature/syed
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as api from "../util/api";


import { 
    IconButton, 
    InputAdornment 
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import * as api from "../util/api";

const Profile = () => {
  // Form state
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [career, setCareer] = useState("");
  const [college, setCollege] = useState("");

  // Language/Skills state
  const language = ["Java", "Python", "C++", "JavaScript", "SQL"];
  const [tester, setTester] = useState([]);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");        
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
<<<<<<< HEAD
  // User session
  const [savedUser, setSavedUser] = useState(null);

  // Load user data from session storage on mount
=======
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

>>>>>>> feature/syed
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

<<<<<<< HEAD
  // Handle multiple language selection
  const handleMultiple = (e) => {
    const { target: { value } } = e;
    setTester(typeof value === "string" ? value.split(",") : value);
  };

  // Toggle password visibility
  const passwordVisibility = (field) => {
    if (field === "current") setShowCurrentPassword(!showCurrentPassword);
    if (field === "new") setShowNewPassword(!showNewPassword);
    if (field === "confirm") setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle save changes
=======
const passwordVisibility = (field) => {
  if (field === "current") setShowCurrentPassword(!showCurrentPassword);
  if (field === "new") setShowNewPassword(!showNewPassword);
  if (field === "confirm") setShowConfirmPassword(!showConfirmPassword);
};

>>>>>>> feature/syed
  const handleSave = async () => {
    if (!savedUser) {
      alert("No user session found.");
      return;
    }

<<<<<<< HEAD
    // Password validation if password fields are filled
    if (newPassword.length > 0 || confirmPassword.length > 0) {
      if (currentPassword !== savedUser.password) {
=======
    
    if(newPassword.length > 0 || confirmPassword.length > 0)
    {
      if (currentPassword !== savedUser.password)
      {
>>>>>>> feature/syed
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
<<<<<<< HEAD
    }

=======

    }

    
>>>>>>> feature/syed
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
<<<<<<< HEAD
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
          {/* Basic Info Section */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            Basic Information
          </Typography>

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
              fullWidth
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
            />
          </Box>

          <TextField 
            label="Email" 
            fullWidth
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <TextField 
            label="City" 
            fullWidth
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
          />

          <TextField 
            label="Career" 
            fullWidth
            value={career} 
            onChange={(e) => setCareer(e.target.value)} 
          />

          <TextField 
            label="College" 
            fullWidth
            value={college} 
            onChange={(e) => setCollege(e.target.value)} 
          />

          {/* Skills Section */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            Skills & Languages
          </Typography>

          <FormControl fullWidth variant="outlined">
            <InputLabel id="lang-select">Select Languages</InputLabel>
            <Select
              labelId="lang-select"
              multiple
              value={tester}
              onChange={handleMultiple}
              label="Select Languages"
              renderValue={(selLang) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selLang.map((value) => (
                    <Chip key={value} label={value} size="small" />
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

          {/* Security & Password Section */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            Security & Password
          </Typography>

          <TextField 
            fullWidth 
            label="Current Password" 
            type={showCurrentPassword ? "text" : "password"} 
            value={currentPassword}
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
=======
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
>>>>>>> feature/syed
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
<<<<<<< HEAD
              InputProps={{
=======
               InputProps={{
>>>>>>> feature/syed
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => passwordVisibility("new")}
                      edge="end"
<<<<<<< HEAD
                    >
=======
                      >
>>>>>>> feature/syed
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
<<<<<<< HEAD
=======
              
>>>>>>> feature/syed
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
<<<<<<< HEAD
                    >
=======
                      >
>>>>>>> feature/syed
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

<<<<<<< HEAD
          {/* Save Button */}
=======
>>>>>>> feature/syed
          <Button
            fullWidth
            variant="contained"
            onClick={handleSave}
<<<<<<< HEAD
            sx={{ backgroundColor: "#f680dc", "&:hover": { backgroundColor: "#d46bb8" }, mt: 2 }}
=======
            sx={{ backgroundColor: "#f680dc", "&:hover": { backgroundColor: "#d46bb8" } }}
>>>>>>> feature/syed
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
