'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Logo from '../assets/images/logo.png';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{ 
          background: '#0a0e27',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
        }}
      >
        <Toolbar 
          sx={{ 
            padding: '0.5rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Image 
              src={Logo} 
              alt="Logo" 
              width={50} 
              height={50}
              style={{ 
                display: 'block',
                width: '50px',
                height: '50px'
              }}
            />
          </Box>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              color: '#e0e6f5',
              fontSize: '1.25rem',
              fontWeight: 600,
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            ShieldChat
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
