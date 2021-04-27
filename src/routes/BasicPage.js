import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import DocItem from "../components/DocItem";
import SearchBox from "../components/SearchBox";
import NewDocButton from "../components/NewDocButton";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 16px;
  height: 500px;
`;

// Fetch title
// Object.values(data._immutable.currentContent.blockMap).find(el => el.type === 'header-one').text

function BasicPage() {
  const history = useHistory();

  return (
    <Container>
      <Typography variant="h1" style={{ fontSize: "2.5rem" }}>
        Document Keeper
      </Typography>
      <Typography variant="h2" style={{ fontSize: "2.2rem" }}>
        Docs
      </Typography>
      <SearchBox />
      <DocItem title="Title" author="Author" />
      <DocItem title="Title" author="Author" />
      <NewDocButton />
    </Container>
  );
}

export default BasicPage;
