import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import styled from "styled-components";
import DocItem from "../components/DocItem";
import SearchBox from "../components/SearchBox";
import ActionButton from "../components/ActionButton";
import { useHistory } from "react-router-dom";

const DATA_URL = "http://localhost:3002/tutorials";

const Container = styled.div`
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 16px;
`;

const Loader = styled(CircularProgress)`
  color: rgba(5, 70, 90, 0.75);
`;

// Fetch title
// Object.values(data._immutable.currentContent.blockMap).find(el => el.type === 'header-one').text

function BasicPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(true);

      fetch(DATA_URL)
        .then((res) => res.json())
        .then((result) => {
          mounted && setData(result);
        })
        .catch(console.log("Error"))
        .finally(() => {
          mounted && setLoading(false);
        });
    }

    return () => {
      mounted = false;
    };
  }, []);

  console.log(data);
  return (
    <Container>
      <Typography variant="h1" style={{ fontSize: "2.5rem" }}>
        Document Keeper
      </Typography>
      <Typography variant="h2" style={{ fontSize: "2.2rem" }}>
        Docs
      </Typography>
      <SearchBox />
      {loading && <Loader style={{ width: "200px", height: "200px" }} />}
      {!loading &&
        data.map((el) => (
          <DocItem
            key={`document_ID${el.id}`}
            title={
              el.content.blocks.find((item) => item.type === "header-one").text
            }
            id={el.id}
            preview="Author"
          />
        ))}
      <ActionButton type="add" />
    </Container>
  );
}

export default BasicPage;
