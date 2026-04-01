import { useState } from "react";
import {
  TextField,
  Autocomplete,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid
} from '@mui/material';

const Search = ( ) => {
  const mockUsers = [
    {
      _id: '69c2b467940e9425c705361b',
      userName: 'userC',
      email: 'userC@gmail.com',
      password: 'ccc',
      address: '100 street',
      birthDay: '15-02-2025',
      city: 'Water Loop',
      postalCode: 'nnn-888',
      province: 'On',
      firstName: 'John',
      lastName: 'Doe'
    }
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  const userLabel = (user) => {
    if (!user) return "";
    return `${user.userName} (${user.email})`;
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "2rem auto", padding: "0 1rem" }}>
      <Typography variant="h4" gutterBottom>Find User</Typography>
      
      <Autocomplete
        options={mockUsers}
        autoHighlight
        getOptionLabel={(option) => userLabel(option)}
        onChange={(_event, newValue) => setSelectedUser(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Search by Username or Email" variant="outlined" />
        )}
        sx={{ mb: 4 }}
      />

      {selectedUser && (
        <Card sx={{ boxShadow: 3, borderRadius: 2, bgcolor: '#fff' }}>
          <CardContent>
            <Typography variant="h5" color="primary" gutterBottom>
              {selectedUser.userName}
            </Typography>
            
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Full Name</Typography>
                <Typography variant="body1">
                  {selectedUser.firstName || "N/A"} {selectedUser.lastName || ""}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Birthday</Typography>
                <Typography variant="body1">{selectedUser.birthDay}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">City/Province</Typography>
                <Typography variant="body1">
                  {selectedUser.city}, {selectedUser.province}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Address</Typography>
                <Typography variant="body1">
                  {selectedUser.address}, {selectedUser.postalCode}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Search;