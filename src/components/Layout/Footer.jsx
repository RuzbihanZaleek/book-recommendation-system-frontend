import { Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-3 text-center">
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Book Recommendation System. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
