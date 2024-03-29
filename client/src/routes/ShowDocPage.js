import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ActionButton from "../components/ActionButton";
import ActionButtonsContainer from "../components/ActionButtonsContainer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { theme } from "../themeColors";
import EditIcon from "@material-ui/icons/Edit";
import GenericModal from "../components/GenericModal";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Button } from "@material-ui/core";
import { getDoc, iconDimensions } from "../helpers";

const Container = styled.div`
  img {
    max-width: 900px;
    border-radius: 8px;
  }
`;

const FailureIcon = styled(ErrorOutlineIcon)`
  color: ${theme.warning.base};
  width: 60px;
  height: 60px;
`;

const PrimaryActionBtn = styled(Button)`
  background-color: ${theme.primary.base};
  color: ${theme.buttonIcon};
  :hover {
    background-color: ${theme.primary.hovered};
  }
  transition: all 250ms linear;
`;

function ShowDocPage() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(true);

      getDoc("http://localhost:3002/documents/", id)
        .then((result) => {
          setContent(result.content);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error");
          setLoading(false);
          setError(true);
          setErrorMsg(error.message);
        });
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "28px", margin: "16px auto" }}>
        {loading && <Loader />}
        {!loading && content && (
          <Editor
            toolbarOnFocus={false}
            toolbarHidden={true}
            readOnly={true}
            editorState={EditorState.createWithContent(convertFromRaw(content))}
          />
        )}
      </Paper>
      <ActionButtonsContainer position="left">
        <ActionButton
          onClick={() => history.push("/")}
          color={theme.buttonIcon}
          backgroundColor={theme.primary.base}
          hoverColor={theme.primary.hovered}
          icon={<ArrowBackIcon style={iconDimensions} />}
        />
      </ActionButtonsContainer>
      <ActionButtonsContainer position="right">
        <ActionButton
          onClick={() => history.push(`/edit/${id}`)}
          color={theme.buttonIcon}
          backgroundColor={theme.primary.base}
          hoverColor={theme.primary.hovered}
          icon={<EditIcon style={iconDimensions} />}
        />
      </ActionButtonsContainer>
      <GenericModal
        shouldOpen={error}
        onClose={() => {
          setError(false);
          history.push(`/`);
        }}
        icon={<FailureIcon />}
        title={"Something went wrong!"}
        text={errorMsg}
        buttons={[
          <PrimaryActionBtn
            onClick={() => {
              setError(false);
              history.push(`/`);
            }}
            key="failure_btn"
          >
            OK
          </PrimaryActionBtn>,
        ]}
      />
    </Container>
  );
}

export default ShowDocPage;
