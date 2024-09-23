import React from 'react';
import { Container, Typography, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import GroupPhoto from '../images/Officers-GA1-24-25_group-photo.jpg';

const About = () => (
  <Container 
    maxWidth="lg" 
    sx={{ 
      my: 4, 
      minHeight: '100vh',
      display: 'flex', 
      alignItems: 'center'
    }}
  >
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Typography variant="h4" gutterBottom>About Us</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium mi eu nisl vulputate, sit amet dignissim magna viverra. Donec varius vulputate nulla in sagittis. Proin posuere nec dui quis ullamcorper. Curabitur at posuere turpis. Nullam ut finibus urna. Integer commodo ipsum at laoreet ultrices. Quisque elementum interdum augue, eget mattis justo maximus congue. Nunc vulputate tortor risus, vestibulum rutrum ante commodo in.
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <CardMedia
          component="img"
          height="300"
          image={GroupPhoto}
          alt="Organization photo"
        />
      </Grid>
    </Grid>
  </Container>
);

export default About;
