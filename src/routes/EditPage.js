import React, { useState, useEffect, useRef } from "react";
import { Typography, Button } from "@material-ui/core";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { theme } from "../themeColors";
import Loader from "../components/Loader";
import GenericModal from "../components/GenericModal";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ActionButton from "../components/ActionButton";
import ActionButtonsContainer from "../components/ActionButtonsContainer";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

const Container = styled.div`
  padding: 16px;

  .rich-toolbar {
    border: 1px solid rgba(0, 0, 0, 0.2);
    position: sticky;
    top: 0;
    z-index: 1001;
  }
  .rich-wrapper {
    margin: 22px auto;
  }
  .rich-wrapper div {
    border-radius: 8px;
  }
  .rdw-option-active {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .rich-editor {
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #f1f1f1;
    border-radius: 8px;
    margin: 22px auto;
    padding: 20px;
  }
`;

const DeleteModalIcon = styled(HighlightOffOutlinedIcon)`
  color: ${theme.warning.base};
  width: 60px;
  height: 60px;
`;

const SecondaryActionBtn = styled(Button)`
  background-color: ${theme.secondary.base};
  color: ${theme.buttonIcon};
  :hover {
    background-color: ${theme.secondary.hovered};
  }
  transition: all 250ms linear;
`;

const DeleteActionBtn = styled(Button)`
  background-color: ${theme.warning.base};
  color: ${theme.buttonIcon};
  :hover {
    background-color: ${theme.warning.hovered};
  }
  transition: all 250ms linear;
`;

const SuccessIcon = styled(CheckCircleOutlineOutlinedIcon)`
  color: ${theme.success.base};
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

// @TODO MODAL NOT SAVED

function EditPage() {
  const { id } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [changedState, setChangedState] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(true);

      if (id) {
        const DOC_URL = `http://localhost:3002/tutorials/${id}`;

        fetch(DOC_URL)
          .then((res) => res.json())
          .then((result) => {
            setEditorState(
              EditorState.createWithContent(convertFromRaw(result.content))
            );
          })
          .catch(console.log("Error"))
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (newEditorState) => {
    const currentContent = editorState.getCurrentContent();
    const newContent = newEditorState.getCurrentContent();

    setEditorState(newEditorState);

    if (currentContent !== newContent) {
      setChangedState(true);
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3002/tutorials/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        history.push(`/`);
      });
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    if (!raw.blocks.map((it) => it.type).includes("header-one")) {
      //@TODO Open modal to provide title
      console.log("No title");
    } else {
      if (id) {
        fetch(`http://localhost:3002/tutorials/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            { content: raw, createdAt: new Date() },
            null,
            2
          ),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            setSaveModalOpen(true);
          });
      } else {
        fetch("http://localhost:3002/tutorials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            { content: raw, createdAt: new Date() },
            null,
            2
          ),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            setSaveModalOpen(true);
          });
      }
    }
  };

  console.log(convertToRaw(editorState.getCurrentContent()));
  window.theState = convertToRaw(editorState.getCurrentContent());

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "32px" }}>
        {loading && <Loader />}
        {!loading && (
          <>
            <Typography variant="h2" style={{ fontSize: "2.2rem" }}>
              Docs
            </Typography>
            <Editor
              editorState={editorState}
              toolbarClassName="rich-toolbar"
              wrapperClassName="rich-wrapper"
              editorClassName="rich-editor"
              onEditorStateChange={handleChange}
            />
          </>
        )}
        <GenericModal
          shouldOpen={saveModalOpen}
          onClose={() => {
            setSaveModalOpen(false);
            history.push(`/`);
          }}
          icon={<SuccessIcon />}
          title={"Success!"}
          text={"File saved succesfully!"}
          buttons={[
            <PrimaryActionBtn
              onClick={() => {
                setSaveModalOpen(false);
                history.push(`/`);
              }}
            >
              OK
            </PrimaryActionBtn>,
          ]}
        />
        <GenericModal
          shouldOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          icon={<DeleteModalIcon />}
          title="Are you sure?"
          text="Do you want to delete this file?"
          buttons={[
            <SecondaryActionBtn onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </SecondaryActionBtn>,
            <DeleteActionBtn onClick={() => handleDelete(id)}>
              Delete
            </DeleteActionBtn>,
          ]}
        />
        <ActionButtonsContainer position="left">
          <ActionButton
            onClick={() => history.push("/")}
            color={theme.buttonIcon}
            backgroundColor={theme.primary.base}
            hoverColor={theme.primary.hovered}
            icon={<ArrowBackIcon style={{ width: "50px", height: "50px" }} />}
          />
        </ActionButtonsContainer>
        <ActionButtonsContainer position="right">
          <ActionButton
            onClick={handleSave}
            color={theme.buttonIcon}
            backgroundColor={theme.primary.base}
            hoverColor={theme.primary.hovered}
            icon={<SaveIcon style={{ width: "50px", height: "50px" }} />}
          />
          {id && (
            <ActionButton
              onClick={() => setDeleteModalOpen(true)}
              color={theme.buttonIcon}
              backgroundColor={theme.warning.base}
              hoverColor={theme.warning.hovered}
              icon={<DeleteIcon style={{ width: "50px", height: "50px" }} />}
            />
          )}
        </ActionButtonsContainer>
      </Paper>
    </Container>
  );
}

export default EditPage;
