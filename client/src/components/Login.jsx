import { useState } from "react";
import {
    Paper,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Alert
} from "@mui/material";

//import * as api from "../util/api"
import logo from "../assets/Ducky.png";
import { useNavigate } from 'react-router-dom'; 

const Login = (props) => {

    const [userName, setUserName] = useState(sessionStorage.getItem("userName") || "");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    console.log("Login component initialized with userName:", userName);

     const handleLogin = async () => {
            try {
                //api.users.postUser(,password);
                sessionStorage.setItem("userId", userName);
                navigate('/profile');
    
            } catch (err) {
                console.error("Registration error:", err);
            }
        };

    return (
        <Paper elevation={4} sx={{ mt: "0.5em" }}>
            <CardContent>
                <img src={logo} alt="Cupid Community Logo" style={{ width: "40%", maxWidth: "200px", margin: "1em" }} />
                <CardHeader title="Login your Account" sx={{ color: "#f680dc" }}/>
                <TextField fullWidth label="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} sx={{ mb: "1em" }}
                />
                <TextField fullWidth label="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} sx={{ mb: "1em" }}
                />
                <Button fullWidth variant="contained" disabled={!password || !userName}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </CardContent>
			{props.error && <Alert severity="error">{props.error}</Alert>}
        </Paper>
    );
};

export default Login;