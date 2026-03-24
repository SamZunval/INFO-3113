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
<<<<<<< HEAD
=======

>>>>>>> 6036a6a7478b73062e15dc7e70619f7df5fccdff
import * as api from "../util/api"
import logo from "../assets/Ducky.png";
import DatePicker from "./DatePicker";
const Register = () => {
    const navigate = useNavigate();
    
    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        province: "",
        city: "",
        birthDay: "",
        postalCode: ""
    });

    const [error, setError] = useState("");
<<<<<<< HEAD
    const [isEmailValid, setEmail] = useState(false);
    const [isPostalCodeValid, setPostalCode] = useState(false);

=======
    const dateUpdated = (e) => { setRegisterData({ ...registerData, birthDay: e })}
>>>>>>> 6036a6a7478b73062e15dc7e70619f7df5fccdff
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
                 <img src={logo} alt="Cupid Community Logo" style={{ width: "40%", maxWidth: "200px", margin: "0" ,padding: "0" }} />
                <CardHeader title="Create an Account" sx={{ color: "#f680dc" }} />
                <TextField fullWidth label="First Name" name="firstName" 
                    value={registerData.firstName} onChange={handleChange} required sx={{ mb: "1em", width: "50%" }} />
                <TextField fullWidth label="Last Name" name="lastName" 
                value={registerData.lastName} onChange={handleChange} required sx={{ mb: "1em", width: "50%" }} />
                
                <TextField fullWidth label="Email" name="email" type="email"
                    value={registerData.email} onChange={handleChange} required sx={{ mb: "1em" }} onBlur={validateEmail}/>
                
                <TextField fullWidth label="Password" name="password" type="password"
                    value={registerData.password} onChange={handleChange} required sx={{ mb: "1em" }} />
                
                <DatePicker accept={dateUpdated}></DatePicker>

                 <TextField fullWidth label="Address" name="address" type="address"
                    value={registerData.address} onChange={handleChange} sx={{ mb: "1em" }} />

               <TextField fullWidth label="Province" name="province" type="province"
                    value={registerData.province} onChange={handleChange} sx={{ mb: "1em" }} />
                
                <TextField fullWidth label="City" name="city" type="city"
                    value={registerData.city} onChange={handleChange} sx={{ mb: "1em" }} />
                
                <TextField fullWidth label="Postal Code" name="postalCode" type="postalCode"
                    value={registerData.postalCode} onChange={handleChange} sx={{ mb: "1em" }} onBlur={validatePostalCode}/>
                
                <Button fullWidth variant="contained" 
                    disabled={!registerData.password || !registerData.userName || !registerData.email || !isEmailValid ||!isPostalCodeValid}
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
