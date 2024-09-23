import React, { useState } from 'react';
import { TextField, MenuItem, Button, Container, Typography, Autocomplete } from '@mui/material';
import Grid from '@mui/material/Grid';
import departmentsProgramsMap from '../data/DepartmentPrograms';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import PrivacyConsentDialog from './PrivacyConsentDialogBox';

const firebaseConfig = {
    apiKey: "AIzaSyADtsnaWmpHzQ1zIcIBwtyqANuUldMRf_8",
    authDomain: "gdsc-arw.firebaseapp.com",
    projectId: "gdsc-arw",
    storageBucket: "gdsc-arw.appspot.com",
    messagingSenderId: "352676839422",
    appId: "1:352676839422:web:76a8f05cd1650221368aaf",
    measurementId: "G-309HR2L7KC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const departments = [
    'GCOE', 'COS', 'RVRCOB', 'SOE', 'CLA', 'BAGCED', 'CCS'
];

const RegForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        department: '',
        program: '',
        idNumber: '',
        birthday: '',
        email: '',
        contactNumber: ''
    });

    // State for available programs
    const [availablePrograms, setAvailablePrograms] = useState([]);
    const [isConsentDialogOpen, setIsConsentDialogOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'department') {
            setAvailablePrograms(departmentsProgramsMap[value] || []);
            setFormData({
                ...formData,
                department: value,
                program: ''
            });
        }
    };

    const handleProgramChange = (event, newValue) => {
        setFormData(prevData => ({
            ...prevData,
            program: newValue
        }));
    };

    const handleSubmit = async () => {
        console.log(formData);

        try {
            const docRef = await addDoc(collection(db, "applicants"), formData);
            console.log("Document written with ID: ", docRef.id);
            alert("Registration successful!");
            setFormData({
                firstName: '',
                lastName: '',
                department: '',
                program: '',
                idNumber: '',
                birthday: '',
                email: '',
                contactNumber: ''
            });
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Registration failed. Please try again.");
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsConsentDialogOpen(true);
    };

    const handleAgree = () => {
        setIsConsentDialogOpen(false);
        handleSubmit();
    };

    const handleDialogClose = () => {
        setIsConsentDialogOpen(false); 
    };

    return (
        <Container
            component="main"
            maxWidth="lg"
            sx={{
                my: 4,
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Organization Registration Form
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="lastName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    name="department"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Department"
                                    value={formData.department}
                                    onChange={handleChange}
                                >
                                    {departments.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={availablePrograms}  // Dynamically populate programs
                                    getOptionLabel={(option) => option}
                                    value={formData.program}
                                    onChange={handleProgramChange}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Program" variant="outlined" required fullWidth />
                                    )}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    disableClearable
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="idNumber"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="ID Number"
                                    value={formData.idNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="birthday"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Birthday"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formData.birthday}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="contactNumber"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Contact Number"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            
            {/* Privacy Consent Dialog */}
            <PrivacyConsentDialog 
                open={isConsentDialogOpen} 
                onAgree={handleAgree} 
                onClose={handleDialogClose} 
            />
        </Container>
    );
};

export default RegForm;
