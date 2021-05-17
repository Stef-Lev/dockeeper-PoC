import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

const ButtonsContainer = styled(DialogActions)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

function GenericModal({ shouldOpen, onClose, icon, title, text, buttons }) {
  return (
    <>
      <Modal
        open={shouldOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconContainer>{icon}</IconContainer>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>

        <ButtonsContainer>
          {buttons && buttons.map((btn) => btn)}
        </ButtonsContainer>
      </Modal>
    </>
  );
}

export default GenericModal;
