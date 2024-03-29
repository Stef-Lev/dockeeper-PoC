import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import { theme } from "../themeColors";

const LoadingCircle = styled(CircularProgress)`
  color: ${theme.primary.base};
`;

function Loader() {
  return (
    <LoadingCircle
      style={{ width: "200px", height: "200px", margin: "50px auto" }}
    />
  );
}

export default Loader;
