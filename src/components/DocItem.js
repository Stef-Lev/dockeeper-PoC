import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";

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

const TagChip = styled(Chip)`
  border-radius: 12px;
  background-color: rgba(5, 70, 90, 0.75);
  color: #fff;
  margin-right: 4px;
  opacity: 0.8;
`;

function DocItem({ title, author, tags }) {
  return (
    <StyledContainer
      onClick={(e) => {
        e.preventDefault();
        console.log("clicked");
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
                  {author}
                </Typography>
                {tags.map((el) => (
                  <TagChip size="medium" label={el.toUpperCase()} />
                ))}
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
