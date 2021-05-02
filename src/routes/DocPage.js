import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DOMPurify from "dompurify";
import { Paper, CircularProgress } from "@material-ui/core";
import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

const DATA_URL = "http://localhost:3002/tutorials/102";

const Container = styled.div`
  padding: 32px;
  img {
    max-width: 900px;
  }
`;

const Loader = styled(CircularProgress)`
  color: rgba(5, 70, 90, 0.75);
`;

function DocPage() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [convertedContent, setConvertedContent] = useState(null);
  const [hideToolbar, setHideToolbar] = useState(true);
  const [newEditorState, setNewEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(true);

      fetch(DATA_URL)
        .then((res) => res.json())
        .then((result) => {
          setContent(result.content);
        })
        .catch(console.log("Error"))
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "32px" }}>
        {loading && <Loader style={{ width: "200px", height: "200px" }} />}
        {!loading && content && (
          <Editor
            toolbarOnFocus={false}
            toolbarHidden={true}
            readOnly={true}
            editorState={EditorState.createWithContent(convertFromRaw(content))}
          />
        )}
      </Paper>
    </Container>
  );
}

export default DocPage;
