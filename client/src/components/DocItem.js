import React, { useState } from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import GenericModal from "../components/GenericModal";
import { theme } from "../themeColors";
import { useHistory } from "react-router-dom";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { getAllDocs, getDoc, deleteDoc } from "../helpers";

const StyledContainer = styled.div`
  width: 90%;
  text-align: left;
  padding: 10px;
  :hover {
    cursor: pointer;
  }
`;

const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ControlsContainer = styled.div`
  transition: all 150 ease-in;
`;

const EditButton = styled(IconButton)`
  background-color: ${theme.secondary.base};
  color: ${theme.buttonIcon};
  margin-right: 10px;
  :hover {
    background-color: ${theme.secondary.hovered};
  }
  transition: all 250ms linear;
`;

const DeleteButton = styled(IconButton)`
  background-color: ${theme.warning.base};
  color: ${theme.buttonIcon};
  :hover {
    background-color: ${theme.warning.hovered};
  }
  transition: all 250ms linear;
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

function DocItem({ title, createdAt, id, withControls }) {
  const history = useHistory();

  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = (id) => {
    deleteDoc("http://localhost:3002/documents/", id)
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        setModalOpen(false);
        setError(true);
        setErrorMsg("File was not deleted");
      });
  };

  return (
    <>
      <StyledContainer
        onClick={(e) => {
          e.stopPropagation();
          history.push(`/document/${id}`);
        }}
      >
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <DataContainer>
              <InfoContainer>
                <DescriptionOutlinedIcon
                  style={{ width: "50px", height: "50px", marginRight: "16px" }}
                />
                <div>
                  <Typography
                    variant="h3"
                    style={{ fontSize: "1.8rem", marginBottom: "4px" }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ fontSize: "1.2rem", marginBottom: "4px" }}
                  >
                    {createdAt ? createdAt.toString() : null}
                  </Typography>
                </div>
              </InfoContainer>
              {withControls && (
                <ControlsContainer>
                  <EditButton
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/edit/${id}`);
                    }}
                  >
                    <EditIcon />
                  </EditButton>
                  <DeleteButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </DeleteButton>
                </ControlsContainer>
              )}
            </DataContainer>
          </Paper>
        </Grid>
      </StyledContainer>
      <GenericModal
        shouldOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        icon={<DeleteModalIcon />}
        title="Are you sure?"
        text="Do you want to delete this file?"
        buttons={[
          <SecondaryActionBtn
            onClick={() => setModalOpen(false)}
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
    </>
  );
}

export default DocItem;
