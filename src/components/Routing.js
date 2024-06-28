import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CurrencyConverterPage from "./CurrencyConverterPage";
import CurrencyExchangePage from "./CurrencyExchangePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import logo from "../styles/images/favicon.ico";
import { styled } from "@mui/system";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(3, 0),
}));

const NotFound = () => (
  <Typography variant="h3">404 Sorry, this page was not found</Typography>
);

const Routing = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Router>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <FontAwesomeIcon
              icon={faHandHoldingUsd}
              size="2x"
              style={{ marginRight: "10px" }}
            />
            <Typography
              variant="h6"
              noWrap
              component={StyledNavLink}
              to="/"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              CurrencyXchange
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={StyledNavLink}
                  to="/"
                >
                  Home
                </MenuItem>
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={StyledNavLink}
                  to="/currency-converter"
                >
                  Currency Converter
                </MenuItem>
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={StyledNavLink}
                  to="/exchange-rates"
                >
                  Exchange Rates
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                component={StyledNavLink}
                to="/"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
              <Button
                component={StyledNavLink}
                to="/currency-converter"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Currency Converter
              </Button>
              <Button
                component={StyledNavLink}
                to="/exchange-rates"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Exchange Rates
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<CurrencyConverterPage />} />
          <Route
            path="/currency-converter"
            element={<CurrencyConverterPage />}
          />
          <Route path="/exchange-rates" element={<CurrencyExchangePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>

      <Footer component="footer">
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                <img
                  src={logo}
                  alt="yb logo"
                  width="30"
                  style={{ marginRight: "10px" }}
                />
                (c) 2024
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="text.primary">
                <FontAwesomeIcon
                  icon={faHandHoldingUsd}
                  style={{ marginRight: "10px" }}
                />
                CurrencyXchange
              </Typography>
            </Box>
            <Box>
              <IconButton
                href="www.linkedin.com/in/yoseph-berhane"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </IconButton>
              <IconButton
                href="https://github.com/yosephdev"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGithubSquare} />
              </IconButton>
              <IconButton
                href="https://yoseph.dev"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGlobe} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Footer>
    </Router>
  );
};

export default Routing;
