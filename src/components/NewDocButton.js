import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

const StyledButton = styled(IconButton)`
  position: absolute;
  z-index: 1001;
  bottom: 36px;
  right: 36px;
  width: 100px;
  height: 100px;
  background-color: #ed4040;
  color: #fff;
  :hover {
    background-color: #e86868;
    color: #fff;
  }
`;

function NewDocButton() {
  return (
    <StyledButton variant="contained">
      <AddIcon style={{ width: "60px", height: "60px" }} />
    </StyledButton>
  );
}

export default NewDocButton;
