import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { theme } from "../themeColors";

const Modal = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    max-width: 750px;
    padding: 16px;
    text-align: center;
  }
  .MuiDialogTitle-root {
    padding: 8px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActionsContainer = styled(DialogActions)`
  justify-content: center;
`;

const DeleteIcon = styled(HighlightOffOutlinedIcon)`
  color: ${theme.cancelControlButton.background};
  width: 60px;
  height: 60px;
`;

const PrimaryActionBtn = styled(Button)`
  background-color: ${theme.actionButton.background};
  color: ${theme.actionButton.color};
  :hover {
    background-color: ${theme.actionButton.hovered};
  }
  transition: all 250ms linear;
`;

const SecondaryActionBtn = styled(Button)`
  background-color: ${theme.cancelButton.background};
  color: ${theme.cancelButton.color};
  margin-right: 16px;
  :hover {
    background-color: ${theme.cancelButton.hovered};
  }
  transition: all 250ms linear;
`;

const DeleteActionBtn = styled(Button)`
  background-color: ${theme.deleteButton.background};
  color: ${theme.deleteButton.color};
  :hover {
    background-color: ${theme.deleteButton.hovered};
  }
  transition: all 250ms linear;
`;

function GenericModal({ shouldOpen, onClose, type, ...props }) {
  const renderModalType = () => {
    switch (type) {
      case "confirmDelete":
        return (
          <>
            <IconContainer>
              <DeleteIcon />
            </IconContainer>
            <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you want to delete this file?
              </DialogContentText>
            </DialogContent>
            <ActionsContainer>
              <SecondaryActionBtn onClick={onClose}>Cancel</SecondaryActionBtn>
              <DeleteActionBtn onClick={props.callBack}>Delete</DeleteActionBtn>
            </ActionsContainer>
          </>
        );
      case "saveSuccess":
        return (
          <>
            <IconContainer>
              <DeleteIcon />
            </IconContainer>
            <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you want to delete this file?
              </DialogContentText>
            </DialogContent>
            <ActionsContainer>
              <SecondaryActionBtn onClick={onClose}>Cancel</SecondaryActionBtn>
              <PrimaryActionBtn onClick={props.callBack}>
                Delete
              </PrimaryActionBtn>
            </ActionsContainer>
          </>
        );

      default:
        break;
    }
  };

  return (
    <>
      <Modal
        open={shouldOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {renderModalType()}
      </Modal>
    </>
  );
}

export default GenericModal;
