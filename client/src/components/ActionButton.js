import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";

const StyledIconButton = styled(IconButton)`
  width: 70px;
  height: 70px;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$color};
  :hover {
    background-color: ${(props) => props.$hoverColor};
  }
  transition: all 250ms linear;
`;

function ActionButton({ icon, backgroundColor, color, hoverColor, onClick }) {
  return (
    <StyledIconButton
      onClick={onClick}
      $backgroundColor={backgroundColor}
      $color={color}
      $hoverColor={hoverColor}
    >
      {icon}
    </StyledIconButton>
  );
}

export default ActionButton;
