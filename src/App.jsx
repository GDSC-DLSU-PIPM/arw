import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import Header from './components/Header';
import About from './components/About';
import RegForm from './components/RegForm';
import Footer from './components/Footer';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <Container maxWidth={false} disableGutters>
      <Header />
      <About />
      <RegForm />
      <Footer />
    </Container>
  </ThemeProvider>
);

export default App;