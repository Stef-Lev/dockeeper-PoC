import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
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

const SuccessIcon = styled(CheckCircleOutlineOutlinedIcon)`
  color: ${theme.successIcon.color};
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
  const modalTypes = {
    confirmDelete: {
      icon: <DeleteIcon />,
      title: "Are you sure?",
      text: "Do you want to delete this file?",
      buttons: [
        <SecondaryActionBtn onClick={onClose}>Cancel</SecondaryActionBtn>,
        <DeleteActionBtn onClick={props.callBack}>Delete</DeleteActionBtn>,
      ],
    },
    saveSuccess: {
      icon: <SuccessIcon />,
      title: "Success!",
      text: "File saved succesfully!",
      buttons: [<PrimaryActionBtn onClick={onClose}>OK</PrimaryActionBtn>],
    },
  };

  const renderModalContent = (piece) => {
    if (piece === "buttons") {
      return modalTypes[type][piece].map((item) => item);
    } else {
      return modalTypes[type][piece];
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
        <IconContainer>{renderModalContent("icon")}</IconContainer>
        <DialogTitle id="alert-dialog-title">
          {renderModalContent("title")}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {renderModalContent("text")}
          </DialogContentText>
        </DialogContent>

        <ActionsContainer>{renderModalContent("buttons")}</ActionsContainer>
      </Modal>
    </>
  );
}

export default GenericModal;
