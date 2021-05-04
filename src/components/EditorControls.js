import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
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

const StyledDeletelBtn = styled(IconButton)`
  width: 80px;
  height: 80px;
  background-color: ${theme.cancelControlButton.background};
  color: ${theme.cancelControlButton.color};
  :hover {
    background-color: ${theme.cancelControlButton.hovered};
  }
  transition: all 250ms linear;
`;

const buttonStyle = { width: "50px", height: "50px" };

function EditorControls({ onSave, onDelete }) {
  return (
    <ControlContainer>
      <StyledSaveBtn variant="contained" onClick={onSave}>
        <SaveIcon style={buttonStyle} />
      </StyledSaveBtn>
      <StyledDeletelBtn variant="contained" onClick={onDelete}>
        <DeleteIcon style={buttonStyle} />
      </StyledDeletelBtn>
    </ControlContainer>
  );
}

export default EditorControls;
