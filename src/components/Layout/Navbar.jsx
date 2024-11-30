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
import { NAMES } from "../../utils/constants";

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
    navigate("/login", { replace: true });
    localStorage.removeItem("authToken");
    setUserId(null);
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
              {NAMES.NAV_BAR.TITLE}
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
            {NAMES.NAV_BAR.MY_LIBRARY}
          </Button>
          <Button color="inherit" component={Link} to="/ai-recommendations">
            {NAMES.NAV_BAR.AI_RECOMMENDATIONS}
          </Button>
          <Button
            onClick={handleLogout}
            color="inherit"
            component={Link}
            to="/login"
          >
            {NAMES.NAV_BAR.LOGOUT}
          </Button>
        </Box>

        {/* Mobile Menu Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={isMobileMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/library">
            {NAMES.NAV_BAR.MY_LIBRARY}
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to="/ai-recommendations"
          >
            {NAMES.NAV_BAR.AI_RECOMMENDATIONS}
          </MenuItem>
          <MenuItem onClick={handleLogout} component={Link} to="/add-book">
            {NAMES.NAV_BAR.LOGOUT}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
