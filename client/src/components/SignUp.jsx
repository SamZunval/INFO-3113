import { useState } from "react";
import {
    Paper,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Alert,
    Box
} from "@mui/material";
import { useNavigate } from 'react-router-dom';


import * as api from "../util/api"
import logo from "../assets/Ducky.png";

import { IconButton, InputAdornment } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Avatar } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
    const navigate = useNavigate();
    
    const [registerData, setRegisterData] = useState({
        salutantion: "",
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        emergencyContac: "",
        password: "",
        address: "",
        province: "",
        city: "",
        birthDay: "",
        postalCode: "",
        college: "",
        career: "",
        member: "",
        preferGender: "",
        gender: ""
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [image, setImage] = useState(null);       


   // const [member, setMember] = React.useState('');

   const handleChange = (e) => {
       setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

   
    
/*
    const memberChnage = (e) =>{
        setMember(event.target.value);
    };
    */

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result); 
            };
            reader.onerror = (error) => {
                console.error("Error reading file: ", error);
            };
        }
    };

    const handleRegister = async () => {
        try {
            
            const newUser = {
                ...registerData,
                profileImage: image  
            };

            await api.users.postUser(newUser);

            console.log("Submitting registration:", newUser);

            setError("");
            sessionStorage.setItem("userName", registerData.userName);
         

            if(registerData.member === "Paid")
            {
                navigate('/payment');
            }
            else
            {
                navigate('/login');
            }

        } catch (err) {
            setError("Something went wrong with registration.");
            console.error("Registration error:", err);
        }
    };

    return (
        <Paper elevation={4} sx={{ mt: "0.5em" }}>
            <CardContent>
                 <img src={logo} alt="Cupid Community Logo" style={{ width: "40%", maxWidth: "200px", margin: "1em" }} />
                <CardHeader title="Create an Account" sx={{ color: "#f680dc" }} />
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                     <Avatar src={image}
                            sx={{ width: 100, height: 100, mb: 1, bgcolor: "#f680dc" }}/>
                    <Button  variant="outlined"
                        component="label"
                        sx={{ color: "#f680dc", borderColor: "#f680dc" }}
                    >
                       Upload Profile Photo
                       <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                </Box>
                <FormControl fullWidth sx={{ mb: "1em" }}>
                    <InputLabel>Salutation</InputLabel>
                        <Select
                            name="salutantion" value={registerData.salutantion} onChange={handleChange} label="Salutantion"
                        >
                            <MenuItem value="Ms.">Ms.</MenuItem>
                            <MenuItem value="Mrs.">Mrs.</MenuItem>
                            <MenuItem value="Mr.">Mr.</MenuItem>
                            <MenuItem value="Dr.">Dr.</MenuItem>
                        </Select>
                </FormControl>

                 <TextField fullWidth label="User Name" name="userName" 
                    value={registerData.userName} onChange={handleChange} sx={{ mb: "1em" }} />

                <TextField fullWidth label="First Name" name="firstName" 
                    value={registerData.firstName} onChange={handleChange} sx={{ mb: "1em" }} />

                <TextField fullWidth label="Last Name" name="lastName" 
                    value={registerData.lastName} onChange={handleChange} sx={{ mb: "1em" }} />
                
                 <FormControl fullWidth sx={{ mb: "1em" }}>
                    <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender" value={registerData.gender} onChange={handleChange} label="Gender"
                        >
                            <MenuItem value="Man">Man</MenuItem>
                            <MenuItem value="Women">Women</MenuItem>
                            <MenuItem value="TransMan">Transgender Man</MenuItem>
                            <MenuItem value="TransWomen">Transgender Women </MenuItem>
                        </Select>
                </FormControl>
                
                <TextField fullWidth label="Email" name="email" type="email"
                    value={registerData.email} onChange={handleChange} sx={{ mb: "1em" }} />

                <TextField fullWidth label="Emergency Contact" name="emergencyContac" type="emergencyContac"
                    value={registerData.emergencyContac} onChange={handleChange} sx={{ mb: "1em" }} />
                
                <TextField fullWidth label="Password" name="password" type={showPassword ? "text" : "password"}
                    value={registerData.password} onChange={handleChange} sx={{ mb: "1em" }} 
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}/>
                
                <TextField fullWidth label="Birthday" name="birthDay" type="birthDay"
                    value={registerData.birthDay} onChange={handleChange} sx={{ mb: "1em" }} />

                 <TextField fullWidth label="Address" name="address" type="address"
                    value={registerData.address} onChange={handleChange} sx={{ mb: "1em" }} />

                <TextField fullWidth label="Province" name="province" type="province"
                    value={registerData.province} onChange={handleChange} sx={{ mb: "1em" }} />
                
                <TextField fullWidth label="City" name="city" type="city"
                    value={registerData.city} onChange={handleChange} sx={{ mb: "1em" }} />
                
                <TextField fullWidth label="Postal Code" name="postalCode" type="postalCode"
                    value={registerData.postalCode} onChange={handleChange} sx={{ mb: "1em" }} />

                <TextField fullWidth label="College" name="college" type="college"
                    value={registerData.college} onChange={handleChange} sx={{ mb: "1em" }} />
                
                 <TextField fullWidth label="Carrer" name="career" type="career"
                    value={registerData.career} onChange={handleChange} sx={{ mb: "1em" }} />
                <FormControl fullWidth sx={{ mb: "1em" }}>
                    <InputLabel>Prefer Gender</InputLabel>
                        <Select
                            name="preferGender" value={registerData.preferGender} onChange={handleChange} label="PreferGender"
                        >
                            <MenuItem value="Man">Man</MenuItem>
                            <MenuItem value="Women">Women</MenuItem>
                            <MenuItem value="TransMan">Transgender Man</MenuItem>
                            <MenuItem value="TransWomen">Transgender Women </MenuItem>
                        </Select>
                </FormControl>
                
                <FormControl fullWidth sx={{ mb: "1em" }}>
                    <InputLabel>Member Type</InputLabel>
                        <Select
                            name="member" value={registerData.member} onChange={handleChange} label="Member Type"
                        >
                            <MenuItem value="Free">Free</MenuItem>
                            <MenuItem value="Paid">Paid</MenuItem>
                        </Select>
                </FormControl>

                <Button fullWidth variant="contained" 
                    disabled={!registerData.password || !registerData.userName || !registerData.email}
                    onClick={handleRegister}
                    sx={{ backgroundColor: "#f680dc", "&:hover": { backgroundColor: "#d46bb8" } }}
                >
                    Sign Up
                </Button>
            </CardContent>
            {error && <Alert severity="error">{error}</Alert>}
        </Paper>
    );
};

export default Register;
