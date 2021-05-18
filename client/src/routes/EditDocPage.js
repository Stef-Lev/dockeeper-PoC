import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import GenericModal from "../components/GenericModal";
import ActionButtonsContainer from "../components/ActionButtonsContainer";
import ActionButton from "../components/ActionButton";
import Loader from "../components/Loader";
import { Typography, Button, Paper } from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import styled from "styled-components";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import { theme } from "../themeColors";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import {
  getDoc,
  deleteDoc,
  postDoc,
  updateDoc,
  iconDimensions,
} from "../helpers";

const Container = styled.div`
  padding: 16px 0px;

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
const FailureIcon = styled(ErrorOutlineIcon)`
  color: ${theme.warning.base};
  width: 60px;
  height: 60px;
`;

function EditDocPage() {
  const { id } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [noTitleModalOpen, setNoTitleModalOpen] = useState(false);
  const [changedState, setChangedState] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(true);

      if (id) {
        getDoc("http://localhost:3002/documents/", id)
          .then((result) => {
            setEditorState(
              EditorState.createWithContent(convertFromRaw(result.content))
            );
            setLoading(false);
          })
          .catch((error) => {
            console.log("Error");
            setLoading(false);
            setError(true);
            setErrorMsg("Document not found!");
          });
      } else {
        setLoading(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleChange = (newEditorState) => {
    const currentContent = editorState.getCurrentContent();
    const newContent = newEditorState.getCurrentContent();

    setEditorState(newEditorState);

    if (currentContent !== newContent) {
      setChangedState(true);
    }
  };

  const handleDelete = (id) => {
    deleteDoc("http://localhost:3002/documents/", id)
      .then((data) => {
        console.log("Success:", data);
        history.push(`/`);
      })
      .catch((error) => {
        console.error("Error:", error);
        setDeleteModalOpen(false);
        setError(true);
        setErrorMsg(error.message);
      });
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    if (!raw.blocks.map((it) => it.type).includes("header-one")) {
      setNoTitleModalOpen(true);
    } else {
      if (id) {
        updateDoc(
          "http://localhost:3002/documents/",
          id,
          { content: raw, createdAt: new Date() },
          null,
          2
        )
          .then((data) => {
            console.log("Success:", data);
            setSaveModalOpen(true);
          })
          .catch((error) => {
            console.error("Error:", error);
            setError(true);
            setErrorMsg(error.message);
          });
      } else {
        postDoc(
          "http://localhost:3002/documents",
          { content: raw, createdAt: new Date() },
          null,
          2
        )
          .then((data) => {
            console.log("Success:", data);
            setSaveModalOpen(true);
          })
          .catch((error) => {
            console.error("Error:", error);
            setError(true);
            setErrorMsg(error.message);
          });
      }
    }
  };

  const handleGoBack = () => {
    if (changedState) {
      setExitModalOpen(true);
    } else {
      history.push("/");
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "16px", margin: "16px auto" }}>
      <Container maxWidth="lg">
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
              key="success_btn"
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
            <SecondaryActionBtn
              onClick={() => setDeleteModalOpen(false)}
              key="cancel_btn"
            >
              Cancel
            </SecondaryActionBtn>,
            <DeleteActionBtn onClick={() => handleDelete(id)} key="delete_btn">
              Delete
            </DeleteActionBtn>,
          ]}
        />
        <GenericModal
          shouldOpen={exitModalOpen}
          onClose={() => {
            setExitModalOpen(false);
          }}
          icon={<FailureIcon />}
          title={"Save changes?"}
          text={"There are unsaved changes. Do you want to save the document?"}
          buttons={[
            <PrimaryActionBtn
              onClick={() => {
                setExitModalOpen(false);
                handleSave();
              }}
              key="save_btn"
            >
              Save
            </PrimaryActionBtn>,
            <SecondaryActionBtn
              onClick={() => {
                history.push(`/`);
              }}
              key="dontsave_btn"
            >
              Don't save
            </SecondaryActionBtn>,
            <SecondaryActionBtn
              onClick={() => {
                setExitModalOpen(false);
              }}
              key="cancel_btn"
            >
              Cancel
            </SecondaryActionBtn>,
          ]}
        />
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
        <GenericModal
          shouldOpen={noTitleModalOpen}
          onClose={() => {
            setNoTitleModalOpen(false);
          }}
          icon={<FailureIcon />}
          title={"Please provide a title!"}
          text={"Every document must have a title (H1 element)"}
          buttons={[
            <PrimaryActionBtn
              onClick={() => {
                setNoTitleModalOpen(false);
              }}
              key="failure_btn"
            >
              OK
            </PrimaryActionBtn>,
          ]}
        />
        <ActionButtonsContainer position="left">
          <ActionButton
            onClick={handleGoBack}
            color={theme.buttonIcon}
            backgroundColor={theme.primary.base}
            hoverColor={theme.primary.hovered}
            icon={<ArrowBackIcon style={iconDimensions} />}
          />
        </ActionButtonsContainer>
        <ActionButtonsContainer position="right">
          <ActionButton
            onClick={handleSave}
            color={theme.buttonIcon}
            backgroundColor={theme.primary.base}
            hoverColor={theme.primary.hovered}
            icon={<SaveIcon style={iconDimensions} />}
          />
          {id && (
            <ActionButton
              onClick={() => setDeleteModalOpen(true)}
              color={theme.buttonIcon}
              backgroundColor={theme.warning.base}
              hoverColor={theme.warning.hovered}
              icon={<DeleteIcon style={iconDimensions} />}
            />
          )}
        </ActionButtonsContainer>
      </Container>
    </Paper>
  );
}

export default EditDocPage;
