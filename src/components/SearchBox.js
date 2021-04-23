import React from "react";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";

const StyledInput = styled(InputBase)`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid grey;
  width: 80%;
`;

function SearchBox() {
  return (
    <div>
      <StyledInput placeholder="Search..." fullWidth />
    </div>
  );
}

export default SearchBox;
