import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import EditIcon from "@material-ui/icons/Edit";

const StyledContainer = styled.div`
  width: 90%;
  text-align: left;
  padding: 10px 16px;
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

function DocItem({ title, author }) {
  return (
    <StyledContainer>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "10px 16px" }}>
          <DataContainer>
            <InfoContainer>
              <DescriptionOutlinedIcon
                style={{ width: "64px", height: "64px", marginRight: "22px" }}
              />
              <div>
                <h3>{title}</h3>
                <h4>{author}</h4>
              </div>
            </InfoContainer>
            <IconButton onClick={() => console.log("Works")}>
              <EditIcon />
            </IconButton>
          </DataContainer>
        </Paper>
      </Grid>
    </StyledContainer>
  );
}

export default DocItem;
