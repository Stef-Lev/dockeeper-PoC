import React from "react";
import styled from "styled-components";
import ActionButton from "../components/ActionButton";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { theme } from "../themeColors";

const ActionsContainer = styled.div`
  position: fixed;
  bottom: 36px;
  gap: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1001;
`;

const positions = { left: { left: "36px" }, right: { right: "36px" } };

function ActionsButtonsContainer({ position, children }) {
  return (
    <ActionsContainer style={{ ...positions[position] }}>
      {children}
    </ActionsContainer>
  );
}

export default ActionsButtonsContainer;
