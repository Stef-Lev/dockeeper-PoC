import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import { theme } from "../themeColors";

const ControlContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  gap: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1001;
`;

const StyledSaveBtn = styled(IconButton)`
  width: 80px;
  height: 80px;
  background-color: ${theme.saveControlButton.background};
  color: ${theme.saveControlButton.color};
  :hover {
    background-color: ${theme.saveControlButton.hovered};
  }
  transition: all 250ms linear;
`;

const StyledCancelBtn = styled(IconButton)`
  width: 80px;
  height: 80px;
  background-color: ${theme.cancelControlButton.background};
  color: ${theme.cancelControlButton.color};
  :hover {
    background-color: ${theme.cancelControlButton.hovered};
  }
  transition: all 250ms linear;
`;

// const StyledButton = styled(IconButton)`
//   position: fixed;
//   z-index: 1001;
//   width: 80px;
//   height: 80px;
//   background-color: ${theme.actionButton.background};
//   color: ${theme.actionButton.color};
//   :hover {
//     background-color: ${theme.actionButton.hovered};
//   }
//   transition: all 250ms linear;
// `;
const buttonStyle = { width: "50px", height: "50px" };

function EditorControls({ onSave, onCancel }) {
  return (
    <ControlContainer>
      <StyledSaveBtn variant="contained" onClick={onSave}>
        <SaveIcon style={buttonStyle} />
      </StyledSaveBtn>
      <StyledCancelBtn variant="contained" onClick={onSave}>
        <CloseIcon style={buttonStyle} />
      </StyledCancelBtn>
    </ControlContainer>
  );
}

export default EditorControls;
