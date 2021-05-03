import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { theme } from "../themeColors";

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 1001;
  width: 80px;
  height: 80px;
  background-color: ${theme.actionButton.background};
  color: ${theme.actionButton.color};
  :hover {
    background-color: ${theme.actionButton.hovered};
  }
  transition: all 250ms linear;
`;
const buttonStyle = { width: "50px", height: "50px" };

function ActionButton({ type, onClick }) {
  const position =
    type === "back"
      ? { bottom: "36px", left: "36px" }
      : { bottom: "36px", right: "36px" };

  return (
    <StyledButton variant="contained" style={position} onClick={onClick}>
      {type === "edit" && <EditIcon style={buttonStyle} />}
      {type === "add" && <AddIcon style={buttonStyle} />}
      {type === "back" && <ArrowBackIcon style={buttonStyle} />}
    </StyledButton>
  );
}

export default ActionButton;
