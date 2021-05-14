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
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { getAllDocs, getDoc } from "../helpers";

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

const StyledSwitch = styled(FormControlLabel)`
  background-color: ${theme.primary.base};
  color: #fff;
  font-weight: bold;
  padding: 9px;
  border-radius: 8px;
  margin: 0px;
  .MuiSwitch-switchBase {
    color: #00a2ed;
  }
  .MuiSwitch-colorPrimary.Mui-checked {
    color: white;
  }
  .MuiSwitch-track {
    color: black;
    opacity: 0.5;
  }
  .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track {
    background-color: white;
  }
`;

function MainPage() {
  const history = useHistory();
  const [withControls, setWithControls] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const storeControlsState = (state) => {
    window.localStorage.setItem("showControls", state);
  };

  const getControlsState = () => {
    let value = window.localStorage.getItem("showControls");
    if (value === "true" || !value) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setWithControls(getControlsState());
  }, []);

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
        <Typography
          variant="h1"
          style={{ fontSize: "2.5rem", marginBottom: "16px" }}
          className="main-title"
        >
          Doc Keeper
        </Typography>
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
                withControls={withControls}
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
      <ActionButtonsContainer position="left">
        <StyledSwitch
          value="top"
          control={
            <Switch
              color="primary"
              checked={withControls}
              onChange={(e) => {
                setWithControls(e.target.checked);
                storeControlsState(e.target.checked);
              }}
            />
          }
          label="Show controls"
          labelPlacement="top"
        />
      </ActionButtonsContainer>
    </Paper>
  );
}

export default MainPage;
