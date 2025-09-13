import {useState, JSX } from 'react';
import {Box, Button, Modal, Typography} from '@mui/material';

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

export const BasicModal = ({open,content, setClose} : BasicModalProps) => {

  return (
      <Modal
        open={open}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {content}
          <Button onClick={setClose}>Close</Button>
        </Box>
      </Modal>
  );
}