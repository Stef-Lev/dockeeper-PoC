import React, { useState } from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import GenericModal from "../components/GenericModal";
import { theme } from "../themeColors";
import { useHistory } from "react-router-dom";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { deleteDoc } from "../helpers";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
  display: flex;
  flex-wrap: nowrap;
  margin-left: 8px;
  gap: 8px;
  transition: all 150 ease-in;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
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

// Fluid Constraints
const fluidTitle = {
  size: 3, // in vw
  max: 30, // in px
  min: 18, // in px
};

// Calculate Breakpoints
const calcMinBreak = (size, min) => Math.round((min * 100) / size);
const calcMaxBreak = (size, max) => Math.round((max * 100) / size);

const StyledTypo = styled(Typography)`
  font-size: ${fluidTitle.size}vw;

  @media (max-width: ${calcMinBreak(fluidTitle.size, fluidTitle.min)}px) {
    font-size: ${fluidTitle.min}px;
  }

  @media (min-width: ${calcMaxBreak(fluidTitle.size, fluidTitle.max)}px) {
    font-size: ${fluidTitle.max}px;
  }
`;

function DocItem({ title, createdAt, id }) {
  const history = useHistory();

  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleDelete = () => {
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

  const handleClickEdit = (event) => {
    event.stopPropagation();
    history.push(`/edit/${id}`);
  };

  const handleClickDelete = (event) => {
    event.stopPropagation();
    setModalOpen(true);
  };

  const menuOptions = [
    { label: "Edit", action: handleClickEdit },
    { label: "Delete", action: handleClickDelete },
  ];

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
                  style={{ width: "50px", height: "50px", marginRight: "8px" }}
                />
                <div>
                  <StyledTypo variant="h3" style={{ marginBottom: "4px" }}>
                    {title}
                  </StyledTypo>
                  {/* <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ fontSize: "1.2rem", marginBottom: "4px" }}
                  >
                    {createdAt ? createdAt.toString() : null}
                  </Typography> */}
                </div>
              </InfoContainer>
              <ControlsContainer>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  {menuOptions.map((option) => (
                    <MenuItem key={option.label} onClick={option.action}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Menu>
              </ControlsContainer>
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
          <DeleteActionBtn onClick={handleDelete} key="delete_btn">
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
