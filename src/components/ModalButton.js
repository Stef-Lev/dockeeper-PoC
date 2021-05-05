import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { theme } from "../themeColors";

const StyleModalButton = styled(Button)`
  background-color: ${(props) => theme[props.$type].base};
  color: ${theme.buttonIcon};
  :hover {
    background-color: ${(props) => theme[props.$type].hovered};
  }
  transition: all 250ms linear;
`;

function ModalButton({ type, text }) {
  return <StyleModalButton $type={type}>{text}</StyleModalButton>;
}

export default ModalButton;
