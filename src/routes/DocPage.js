import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DOMPurify from "dompurify";
import { Paper, CircularProgress } from "@material-ui/core";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";

const DATA_URL = "http://localhost:3002/tutorials/101";

const Container = styled.div`
  padding: 32px 16px;
`;

const Loader = styled(CircularProgress)`
  color: rgba(5, 70, 90, 0.75);
`;

function DocPage() {
  const [convertedContent, setConvertedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editorState, setEditorState] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(true);

      fetch(DATA_URL)
        .then((res) => res.json())
        .then((result) => {
          mounted && setEditorState(result.contentData);
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

  useEffect(() => {
    console.log(editorState);
    EditorState.createWithContent(editorState);
    convertContentToHTML();
  }, [editorState]);

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    console.log(currentContentAsHTML);
    setConvertedContent(currentContentAsHTML);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <Container>
      {loading && <Loader style={{ width: "200px", height: "200px" }} />}
      {!loading && (
        <Paper elevation={3}>
          <div dangerouslySetInnerHTML={createMarkup(editorState)}></div>
        </Paper>
      )}
    </Container>
  );
}

export default DocPage;
