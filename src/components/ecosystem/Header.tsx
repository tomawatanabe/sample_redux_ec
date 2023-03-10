import * as React from "react";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LoginIcon from "@mui/icons-material/Login";
import SearchBox from "../organisms/SearchBox";

const Header: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  return (
    <>
      {cookies.userID ? (
        <>
          <AppBar position="sticky" sx={{ top: 0 }}>
            <Toolbar>
              <Typography
                variant="h5"
                noWrap
                component={RouterLink}
                to={"/"}
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Sneaker Freak
              </Typography>
              <SearchBox />
              {/* <IconButton size="large" color="inherit" sx={{ mr: 4 }}>
                <QuestionMarkIcon />
              </IconButton> */}
              <IconButton
                component={RouterLink}
                to={"/cart"}
                size="large"
                color="inherit"
                sx={{ mr: 4 }}
              >
                <ShoppingCart />
              </IconButton>
              <IconButton
                component={RouterLink}
                to={"/favorite"}
                size="large"
                color="inherit"
                sx={{ mr: 4 }}
              >
                <FavoriteIcon />
              </IconButton>
              {/* <IconButton size="large" color="inherit" sx={{ mr: 4 }}>
                <HistoryIcon />
              </IconButton> */}
              <IconButton
                component={RouterLink}
                to={"/userprofile"}
                size="large"
                color="inherit"
                sx={{ mr: 4 }}
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                sx={{ mr: 4 }}
                onClick={() => {
                  removeCookie("userID");
                  navigate("/");
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </>
      ) : (
        <>
          <AppBar position="sticky" sx={{ top: 0 }}>
            <Toolbar>
              <Typography
                variant="h5"
                noWrap
                component={RouterLink}
                to={"/"}
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Sneaker Freak
              </Typography>
              <SearchBox />
              {/* <IconButton size="large" color="inherit" sx={{ mr: 4 }}>
                <QuestionMarkIcon />
              </IconButton> */}

              <IconButton
                component={RouterLink}
                to={"/cart"}
                size="large"
                color="inherit"
                sx={{ mr: 4 }}
              >
                <ShoppingCart />
              </IconButton>

              <IconButton
                component={RouterLink}
                to={"/signin"}
                size="large"
                color="inherit"
                sx={{ mr: 4 }}
              >
                <LoginIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </>
      )}
    </>
  );
};

export default Header;
