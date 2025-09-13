import { Alert, Snackbar } from '@mui/material';
import { JSX, SyntheticEvent } from 'react';

type BasicAlertPropsType = {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  handleClose: (event?: SyntheticEvent, reason?: string) => void;
};

export const BasicAlert = ({
  open,
  message,
  severity,
  handleClose,
}: BasicAlertPropsType): JSX.Element => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      key={message}
    >
      <Alert severity={severity} variant={'filled'}>
        {message}
      </Alert>
    </Snackbar>
  );
};
