import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, AppBar, Toolbar, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';

const HeroSection = styled('div')({
    backgroundImage: 'url(https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
});

const LandingPage = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        referrer: '',
        referee: '',
        email: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        setError('');
        setSuccess('');
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/referral`, formData);
            setSuccess('Referral submitted successfully');
            setFormData({ referrer: '', referee: '', email: '' });
            setOpen(false);
        } catch (error) {
            setError(error.response?.data?.error || 'Error submitting referral');
        }
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Refer and Earn
                    </Typography>
                </Toolbar>
            </AppBar>
            <HeroSection>
                <Button variant="contained" color="primary" size="large" onClick={() => setOpen(true)}>
                    Refer Now
                </Button>
            </HeroSection>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Referral Form</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="referrer"
                        label="Referrer"
                        type="text"
                        fullWidth
                        value={formData.referrer}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="referee"
                        label="Referee"
                        type="text"
                        fullWidth
                        value={formData.referee}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LandingPage;
