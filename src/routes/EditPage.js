import React, { useState, Component } from "react";
import { Typography } from "@material-ui/core";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  padding: 16px;

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
    padding: 5px 10px;
  }
`;

const SubmitButton = styled(Button)`
  background-color: rgba(5, 70, 90, 0.75);
  color: #fff;
  :hover {
    background-color: rgba(5, 70, 90, 0.5);
    color: #fff;
  }
`;

// @TODO MODAL NOT SAVED
const CancelButton = styled(Button)`
  background-color: rgba(70, 70, 70, 0.5);
  color: #fff;
  margin-right: 16px;
  :hover {
    background-color: rgba(120, 120, 120, 0.5);
    color: #fff;
  }
`;

function EditPage() {
  // @TODO if ID edit else new
  const { id } = useParams();
  const history = useHistory();

  const [convertedContent, setConvertedContent] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    convertContentToHTML();
    // console.log(editorState);
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    console.log(currentContentAsHTML);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const cancelAndReturn = () => {
    history.push("/");
  };

  // @TODO refactor this
  const handleDocPost = () => {
    const data = editorState;

    fetch("http://localhost:3002/tutorials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container>
      <Typography variant="h2" style={{ fontSize: "2.2rem" }}>
        Docs
      </Typography>
      <Editor
        defaultEditorState={id ? EditorState.createEmpty() : ""}
        editorState={editorState}
        toolbarClassName="rich-toolbar"
        wrapperClassName="rich-wrapper"
        editorClassName="rich-editor"
        onEditorStateChange={onEditorStateChange}
      />

      <div
        style={{ backgroundColor: "black", color: "white" }}
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
      <CancelButton variant="contained" onClick={cancelAndReturn}>
        Cancel
      </CancelButton>
      <SubmitButton variant="contained" onClick={handleDocPost}>
        Submit
      </SubmitButton>
    </Container>
  );
}

export default EditPage;
