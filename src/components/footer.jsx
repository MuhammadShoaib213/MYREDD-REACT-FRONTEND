import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  useEffect(() => {
    const updateBodyPadding = () => {
      const footerHeight = document.getElementById('footer').clientHeight;
      document.body.style.paddingBottom = `${footerHeight}px`;
    };

    // Call the function on mount
    updateBodyPadding();

    // Optional: If you expect the footer height to change, add resize event listener
    window.addEventListener('resize', updateBodyPadding);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', updateBodyPadding);
      document.body.style.paddingBottom = '0px'; // Reset padding when footer unmounts
    };
  }, []);

  return (
    <Box
      id="footer" // Add an ID to reference this element
      sx={{
        bgcolor: 'gray',
        color: 'white',
        p: 2,
        textAlign: 'center',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography>&copy; 2023 MY REDD</Typography>
    </Box>
  );
};

export default Footer;
