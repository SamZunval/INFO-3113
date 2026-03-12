import { useState } from "react";
import {
    Paper,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Alert
} from "@mui/material";


import logo from "../assets/Ducky.png";

const Login = (props) => {
    const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
console.log("Login component initialized with userName:", userName);
    const [password, setPassword] = useState("");
   
    
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
                    onClick={() => props.joinRoom({ password, userName })}
                >
                    Login
                </Button>
            </CardContent>
			{props.error && <Alert severity="error">{props.error}</Alert>}
        </Paper>
    );
};

export default Login;