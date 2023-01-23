import * as React from "react";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as RouterLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LoginIcon from "@mui/icons-material/Login";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  alignContent: "flex-start",

  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

const Header: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  console.log("cookies", cookies);
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
                Redux_MUI_EC
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="商品検索"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              {/* <Box sx={{ flexGrow: 1 }} /> */}

              <IconButton size="large" color="inherit" sx={{ mr: 4 }}>
                <QuestionMarkIcon />
              </IconButton>

              <IconButton size="large" color="inherit" sx={{ mr: 4 }}>
                <ShoppingCart />
              </IconButton>
              <IconButton size="large" color="inherit" sx={{ mr: 4 }}>
                <FavoriteIcon />
              </IconButton>
              <IconButton size="large" color="inherit" sx={{ mr: 4 }}>
                <HistoryIcon />
              </IconButton>
              <IconButton size="large" color="inherit" sx={{ mr: 4 }}>
                <AccountCircle />
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                sx={{ mr: 4 }}
                onClick={() => removeCookie("userID")}
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
                Redux_MUI_EC
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="商品検索"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              {/* <Box sx={{ flexGrow: 1 }} /> */}

              <IconButton size="large" color="inherit" sx={{ mr: 4 }}>
                <QuestionMarkIcon />
              </IconButton>

              <IconButton size="large" color="inherit" sx={{ mr: 4 }}>
                <ShoppingCart />
              </IconButton>
              <IconButton size="large" color="inherit" sx={{ mr: 4 }}>
                <FavoriteIcon />
              </IconButton>
              <IconButton size="large" color="inherit" sx={{ mr: 4 }}>
                <HistoryIcon />
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
