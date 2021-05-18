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
import { getAllDocs, iconDimensions } from "../helpers";
import { useHistory } from "react-router-dom";

const { REACT_APP_API_URL } = process.env;

const Container = styled.div`
  margin: 16px auto;
  padding: 16px 0px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

// Fluid Constraints
const fluidTitle = {
  size: 4, // in vw
  max: 60, // in px
  min: 36, // in px
};

// Calculate Breakpoints
const calcMinBreak = (size, min) => Math.round((min * 100) / size);
const calcMaxBreak = (size, max) => Math.round((max * 100) / size);

const StyledTypo = styled(Typography)`
  font-size: ${fluidTitle.size}vw;

  @media (max-width: ${calcMinBreak(fluidTitle.size, fluidTitle.min)}px) {
    font-size: ${fluidTitle.min}px;
  }

  @media (min-width: ${calcMaxBreak(fluidTitle.size, fluidTitle.max)}px) {
    font-size: ${fluidTitle.max}px;
  }
`;

function MainPage() {
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

      getAllDocs(REACT_APP_API_URL)
        .then((result) => {
          setData(result);
          console.log(result);
        })
        .catch((error) => {
          setError(true);
          setErrorMsg(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Paper elevation={3}>
      <Container maxWidth="lg">
        <StyledTypo
          variant="h1"
          style={{ marginBottom: "16px" }}
          className="main-title"
        >
          Doc Keeper
        </StyledTypo>
        <SearchBox
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        {loading && <Loader />}
        {!loading &&
          data &&
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
          icon={<AddIcon style={iconDimensions} />}
        />
      </ActionButtonsContainer>
    </Paper>
  );
}

export default MainPage;
