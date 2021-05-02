import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Paper, CircularProgress } from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import ActionButton from "../components/ActionButton";

const DATA_URL = "http://localhost:3002/tutorials/102";

const Container = styled.div`
  padding: 32px;
  img {
    max-width: 900px;
    border-radius: 8px;
  }
`;

const Loader = styled(CircularProgress)`
  color: rgba(5, 70, 90, 0.75);
`;

function DocPage() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);

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
      <ActionButton type="edit" />
    </Container>
  );
}

export default DocPage;
