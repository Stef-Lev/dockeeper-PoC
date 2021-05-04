import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import { theme } from "../themeColors";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const WarningIcon = styled(ReportProblemOutlinedIcon)`
  color: ${theme.warning.base};
  width: 80px;
  height: 80px;
`;

function ErrorMessage({ msg }) {
  return (
    <ErrorContainer>
      <WarningIcon />
      <Typography variant="h2" style={{ fontSize: "2.2rem" }}>
        Something went wrong!
      </Typography>
      <Typography variant="body1" style={{ fontSize: "1.4rem" }}>
        {msg}
      </Typography>
    </ErrorContainer>
  );
}

export default ErrorMessage;
