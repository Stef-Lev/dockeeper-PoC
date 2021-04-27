import React, { useState, Component } from "react";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
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

function EditPage() {
  // @TODO if ID edit else new
  const { id } = useParams();

  const [convertedContent, setConvertedContent] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    convertContentToHTML();
    console.log(editorState);
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
      <button onClick={handleDocPost}>Click me</button>
    </Container>
  );
}

export default EditPage;
