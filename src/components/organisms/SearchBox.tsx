import { styled, alpha } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { search } from "../redux/searchSlice";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

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

const SearchBox = () => {
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchWord(e.target.value);

  const addSearchWord = (props: string) => {
    // const newSearchWord: SearchType = {
    //   searchWord: searchWord,
    // };
    dispatch(search(searchWord));
  };

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={handleChange}
          placeholder="商品検索"
          inputProps={{ "aria-label": "search" }}
          // Enterが押下されたらReduxに検索ワードを保存
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Enter") {
              addSearchWord(searchWord);
            }
          }}
        />
      </Search>
    </>
  );
};

export default SearchBox;
