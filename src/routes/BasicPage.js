import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";
import styled from "styled-components";
import DocItem from "../components/DocItem";
import SearchBox from "../components/SearchBox";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import ActionButton from "../components/ActionButton";
import ActionButtonsContainer from "../components/ActionButtonsContainer";
import { theme } from "../themeColors";
import AddIcon from "@material-ui/icons/Add";

import { useHistory } from "react-router-dom";

const { REACT_APP_API_URL } = process.env;

const Container = styled.div`
  margin: 16px auto;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 16px;
`;

function BasicPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(true);

      fetch(REACT_APP_API_URL)
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        })
        .catch((err) => {
          setError(true);
          setErrorMsg(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      mounted = false;
    };
  }, []);

  console.log(data);
  return (
    <Paper elevation={3}>
      <Container>
        <Typography variant="h1" style={{ fontSize: "2.5rem" }}>
          Document Keeper
        </Typography>
        <Typography variant="h2" style={{ fontSize: "2.2rem" }}>
          Docs
        </Typography>
        <SearchBox
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        {loading && <Loader />}
        {!loading &&
          data
            .filter((doc) =>
              doc.content.blocks
                .find((item) => item.type === "header-one")
                .text.toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((doc) => (
              <DocItem
                key={`document_ID${doc.id}`}
                title={
                  doc.content.blocks.find((item) => item.type === "header-one")
                    .text
                }
                id={doc.id}
                createdAt={doc.createdAt || null}
              />
            ))}
        {!loading && error && <ErrorMessage msg={errorMsg} />}
      </Container>
      <ActionButtonsContainer position="right">
        <ActionButton
          onClick={() => history.push(`/edit`)}
          color={theme.buttonIcon}
          backgroundColor={theme.primary.base}
          hoverColor={theme.primary.hovered}
          icon={<AddIcon style={{ width: "50px", height: "50px" }} />}
        />
      </ActionButtonsContainer>
    </Paper>
  );
}

export default BasicPage;
