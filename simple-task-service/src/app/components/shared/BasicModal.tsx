import { JSX } from 'react';
import {Box, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface BasicModalProps {
  open: boolean;
  content: JSX.Element;
  setClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const BasicModal = ({open, setClose, content}:BasicModalProps) => {
  return (
    <Modal
      open={open}
      onClose={() => {}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button
          onClick={setClose}
          startIcon={<CloseIcon />}
        >
          Close
        </Button>
        {content}
      </Box>
    </Modal>
  );
}