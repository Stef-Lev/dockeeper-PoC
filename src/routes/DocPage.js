import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Paper, CircularProgress } from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import ActionButton from "../components/ActionButton";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  padding: 32px;
  img {
    max-width: 900px;
    border-radius: 8px;
  }
`;

function DocPage() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);

  const { id } = useParams();
  const history = useHistory();
  const DOC_URL = `http://localhost:3002/tutorials/${id}`;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(true);

      fetch(DOC_URL)
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
      <ActionButton type="back" onClick={() => history.push("/")} />
      <ActionButton type="edit" onClick={() => history.push(`/edit/${id}`)} />
    </Container>
  );
}

export default DocPage;
