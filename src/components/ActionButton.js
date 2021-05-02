import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
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
const buttonStyle = { width: "50px", height: "50px" };

function ActionButton({ type }) {
  return (
    <StyledButton variant="contained">
      {type === "edit" && <EditIcon style={buttonStyle} />}
      {type === "add" && <AddIcon style={buttonStyle} />}
    </StyledButton>
  );
}

export default ActionButton;
