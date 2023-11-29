import { ReactNode, useContext } from 'react';
import { MediaQueryContext } from '@providers';
import {
  Box,
  Modal as BaseModal,
  ModalProps as BaseModalProps,
  SxProps,
  Theme,
} from '@mui/material';
import { Button } from '../Button';
import './Modal.css';

interface ModalProps extends BaseModalProps {
  onClose: () => void;
  sx?: SxProps<Theme>;
  confirmButton: ReactNode;
}

export const Modal = ({ onClose, sx, confirmButton, ...props }: ModalProps) => {
  const { isDesktop } = useContext(MediaQueryContext);

  return (
    <BaseModal onClose={onClose} {...props}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isDesktop ? '25%' : '75%',
          backgroundColor: '#fcfbf8',
          borderRadius: '12px',
          boxShadow: 24,
          p: 4,
          paddingTop: '12px',
          ...sx,
        }}
      >
        {props.children}
        <div className='button-container'>
          <Button
            sx={{
              backgroundColor: '#c1c1c1',
              '&:hover': {
                backgroundColor: '#dcdcdc',
                borderColor: '#fcaac0',
              },
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          {confirmButton}
        </div>
      </Box>
    </BaseModal>
  );
};
