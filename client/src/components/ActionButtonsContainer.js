import React from "react";
import styled from "styled-components";

const ActionsContainer = styled.div`
  position: fixed;
  bottom: 28px;
  gap: 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1001;
`;

const positions = { left: { left: "28px" }, right: { right: "28px" } };

function ActionsButtonsContainer({ position, children }) {
  return (
    <ActionsContainer style={{ ...positions[position] }}>
      {children}
    </ActionsContainer>
  );
}

export default ActionsButtonsContainer;
