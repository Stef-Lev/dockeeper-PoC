import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
  background-color: rgb(170, 170, 170);
  color: rgb(255, 255, 255);
  margin-right: 10px;
  :hover {
    background-color: rgb(120, 120, 120);
    color: rgb(255, 255, 255);
  }
  transition: all 250ms linear;
`;

const DeleteButton = styled(IconButton)`
  background-color: rgb(255, 80, 80);
  color: #fff;
  :hover {
    background-color: rgb(255, 20, 20);
    color: #fff;
  }
  transition: all 250ms linear;
`;

function DocItem({ title, preview, id }) {
  const history = useHistory();

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
              <DeleteButton>
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
