import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { theme } from "../themeColors";
import { useHistory } from "react-router-dom";

const StyledContainer = styled.div`
  width: 90%;
  text-align: left;
  padding: 10px 16px;
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

const EditButton = styled(IconButton)`
  background-color: ${theme.editButton.background};
  color: ${theme.editButton.color};
  margin-right: 10px;
  :hover {
    background-color: ${theme.editButton.hovered};
  }
  transition: all 250ms linear;
`;

const DeleteButton = styled(IconButton)`
  background-color: ${theme.deleteButton.background};
  color: ${theme.deleteButton.color};
  :hover {
    background-color: ${theme.deleteButton.hovered};
  }
  transition: all 250ms linear;
`;

function DocItem({ title, preview, id }) {
  const history = useHistory();

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
        window.location.reload();
      });
  };

  return (
    <StyledContainer
      onClick={(e) => {
        e.stopPropagation();
        history.push(`/document/${id}`);
      }}
    >
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "10px 16px" }}>
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
                  {`${preview.substring(0, 60)}...`}
                </Typography>
              </div>
            </InfoContainer>
            <div>
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
                  handleDelete(id);
                }}
              >
                <DeleteIcon />
              </DeleteButton>
            </div>
          </DataContainer>
        </Paper>
      </Grid>
    </StyledContainer>
  );
}

export default DocItem;
