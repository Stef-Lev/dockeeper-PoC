import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const StyledButton = styled(IconButton)`
  position: absolute;
  z-index: 1001;
  bottom: 36px;
  right: 36px;
  width: 80px;
  height: 80px;
  background-color: rgba(5, 70, 90, 0.75);
  color: #fff;
  :hover {
    background-color: rgba(5, 70, 90, 0.5);
    color: #fff;
  }
`;

function NewDocButton() {
  return (
    <StyledButton variant="contained">
      <AddIcon style={{ width: "50px", height: "50px" }} />
    </StyledButton>
  );
}

export default NewDocButton;
