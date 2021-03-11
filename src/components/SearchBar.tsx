/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import { ReactComponent as CrossIcon } from "../images/cross.svg";
const SearchBar = ({
  search,
  setSearch,
  ...restProps
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const [isActive, setIsActive] = React.useState(false);
  return (
    <div sx={{ overflow: "hidden" }} {...restProps}>
      <SearchIcon
        sx={{
          position: "absolute",
          top: "12px",
          left: "15px",
          width: "20px",
          height: "20px",
          opacity: 1,
          transition: "0.5s",
          ...(isActive && { left: "-20px", opacity: 0 }),
        }}
      />
      <input
        sx={{
          width: "100%",
          pl: "40px",
          pr: "30px",
          transition: "0.5s",
          ...(isActive && { pl: "10px" }),
        }}
        value={search}
        onChange={onChange}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
      {search && (
        <CrossIcon
          onClick={() => setSearch("")}
          sx={{
            position: "absolute",
            top: "12px",
            right: "10px",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            transition: "1s",
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
