
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

const Payment = () => {
    const navigate = useNavigate();
    
    const [cardData, setCardData] = useState({
       firstName: "",
        lastName: "",
        cardNumber: "",
       experyDate: "",
       securityCode: "",
       email: "",
       postalCode: "",
    });

    const PAYMENT_AMOUNT = "5.00$";

    const [error, setError] = useState("");

    const handleChange = (e) => {
      setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        
    };

    return (
        <Paper elevation={4} sx={{ mt: "0.5em" }}>
            <CardContent>
                 <img src={logo} alt="Cupid Community Logo" style={{ width: "40%", maxWidth: "200px", margin: "1em" }} />
                <CardHeader title="Be Premiun!" sx={{ color: "#f680dc" }} />

              <TextField 
                    fullWidth label="Amount" name="Amount" value={PAYMENT_AMOUNT} variant="filled"
                    sx={{ mb: "1em", backgroundColor: "#fdf0f9" }} 
                />

                <TextField fullWidth label="First Name" name="firstName" 
                    value={cardData.firstName} onChange={handleChange} sx={{ mb: "1em" }} />

                <TextField fullWidth label="Last Name" name="lastName" 
                    value={cardData.lastName} onChange={handleChange} sx={{ mb: "1em" }} />
                
                 <TextField fullWidth label="Card Number" name="cardNumber" type="cardNumber"
                    value={cardData.cardNumber} onChange={handleChange} sx={{ mb: "1em" }} />

                <TextField fullWidth label="Expirey Date" name="experyDate" placeholder="MM/YY"
                    value={cardData.experyDate} onChange={handleChange} sx={{ mb: "1em" }} />

                <TextField fullWidth label="Segurity Code" name="securityCode" type="securityCode"
                    value={cardData.securityCode} onChange={handleChange} sx={{ mb: "1em" }} />
                
                <TextField fullWidth label="Email" name="email" type="email"
                    value={cardData.email} onChange={handleChange} sx={{ mb: "1em" }} />
                
                <TextField fullWidth label="Postal Code" name="postalCode" type="postalCode"
                    value={cardData.postalCode} onChange={handleChange} sx={{ mb: "1em" }} />
                
                <Button fullWidth variant="contained" 
                    disabled={!cardData.cardNumber || !cardData.securityCode || !cardData.experyDate || !cardData.firstName || !cardData.lastName}
                    onClick={handlePayment}
                    sx={{ backgroundColor: "#f680dc", "&:hover": { backgroundColor: "#d46bb8" } }}
                >
                    Pay
                </Button>
            </CardContent>
            {error && <Alert severity="error">{error}</Alert>}
        </Paper>
    );
};

export default Payment;
