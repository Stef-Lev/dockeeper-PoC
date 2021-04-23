import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import DocItem from "../components/DocItem";
import SearchBox from "../components/SearchBox";

const Container = styled.div`
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 16px;
  height: 500px;
`;

function BasicPage() {
  return (
    <Container>
      <Typography variant="h3">Document Keeper</Typography>
      <SearchBox />
      <Typography variant="h5">Docs</Typography>
      <DocItem title="Title" author="Author" />
      <DocItem title="Title" author="Author" />
    </Container>
  );
}

export default BasicPage;
