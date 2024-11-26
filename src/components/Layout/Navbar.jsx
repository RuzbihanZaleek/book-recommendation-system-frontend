import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Hidden,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BookImage from "../../assets/book.png";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setUserId } = useUser();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMobileMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUserId(null);
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        {/* Book icon visible on small screens */}
        <Box sx={{ display: { xs: "block", md: "none" }, mr: 1 }}>
          <Link to="/">
            <img
              src={BookImage}
              alt="Book Icon"
              style={{ width: 30, height: 30 }}
            />
          </Link>
        </Box>

        {/* Title with the book icon */}
        <Typography
          variant="h6"
          className="flex-grow"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {/* Book icon before text for larger screens */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Link to="/">
              <img
                src={BookImage}
                alt="Book Icon"
                style={{ width: 30, height: 30 }}
              />
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Link to="/" className="text-white no-underline">
              Book Recommendation System
            </Link>
          </Box>
        </Typography>

        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
          sx={{ display: { xs: "block", sm: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop buttons */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Button color="inherit" component={Link} to="/library">
            My Library
          </Button>
          <Button color="inherit" component={Link} to="/ai-recommendations">
            AI Recommendations
          </Button>
          <Button
            onClick={handleLogout}
            color="inherit"
            component={Link}
            to="/add-book"
          >
            Log Out
          </Button>
        </Box>

        {/* Mobile Menu Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={isMobileMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/library">
            My Library
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to="/ai-recommendations"
          >
            AI Recommendations
          </MenuItem>
          <MenuItem onClick={handleLogout} component={Link} to="/add-book">
            Log Out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
