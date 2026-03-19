import { useState } from "react";
import {
    Paper,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Alert
} from "@mui/material";
import { useNavigate } from 'react-router-dom'; //


import * as api from "../util/api"
import logo from "../assets/Ducky.png";

const Register = () => {
    const navigate = useNavigate();
    
    const [registerData, setRegisterData] = useState({
        userName: "",
        email: "",
        password: "",
        address: "",
        province: "",
        city: "",
        birthDay: "",
        postalCode: ""
    });

    const [error, setError] = useState("");
    const [isEmailValid, setEmail] = useState(false);
    const [isPostalCodeValid, setPostalCode] = useState(false);

    const handleChange = (e) => {
       setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const validateEmail = (e) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(e.target.value)) {
            setError("Please enter a valid email address.");
            setEmail(false);
        } else {
            setError("");
            setEmail(true);
        }
    }
     const validatePostalCode = (e) => {
        const postalCodeRegex = /^[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]$/;
        if (!postalCodeRegex.test(e.target.value)) {
            setError("Please enter a valid postal code.");
            setPostalCode(false);
        } else {
            setError("");
            setPostalCode(true);
        }
    }
    const handleRegister = async () => {
        try {
            console.log("Submitting registration:", registerData);
            var response = api.users.postUser(registerData);
	    if(response.statusCode == 200){
		setError("");
                sessionStorage.setItem("userName", registerData.userName);
                navigate('/login');
	    }
            else if(response.statusCode == 400){
                setError("Registration failed, username already in use.");
            }
            else {
                setError("Something went wrong with registration.");
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
                <TextField fullWidth label="User Name" name="userName" 
                    value={registerData.userName} onChange={handleChange} required sx={{ mb: "1em" }} />
                
                <TextField fullWidth label="Email" name="email" type="email"
                    value={registerData.email} onChange={handleChange} required sx={{ mb: "1em" }} onBlur={validateEmail}/>
                
                <TextField fullWidth label="Password" name="password" type="password"
                    value={registerData.password} onChange={handleChange} required sx={{ mb: "1em" }} />
                
                <TextField fullWidth label="Birthday" name="birthDay" type="birthDay"
                    value={registerData.birthDay} onChange={handleChange} sx={{ mb: "1em" }} />

                 <TextField fullWidth label="Address" name="address" type="address"
                    value={registerData.address} onChange={handleChange} sx={{ mb: "1em" }} />

                <TextField fullWidth label="Province" name="province" type="province"
                    value={registerData.province} onChange={handleChange} sx={{ mb: "1em" }} />
                
                <TextField fullWidth label="City" name="city" type="city"
                    value={registerData.city} onChange={handleChange} sx={{ mb: "1em" }} />
                
                <TextField fullWidth label="Postal Code" name="postalCode" type="postalCode"
                    value={registerData.postalCode} onChange={handleChange} sx={{ mb: "1em" }} onBlur={validatePostalCode}/>
                
                <Button fullWidth variant="contained" 
                    disabled={!registerData.password || !registerData.userName || !registerData.email || !isEmailValid || !isPostalCodeValid}
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
