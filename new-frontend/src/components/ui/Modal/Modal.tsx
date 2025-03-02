import {
  Modal as BaseModal,
  ModalProps as BaseModalProps,
  Box,
  SxProps,
  Theme,
} from '@mui/material';
import { useContext } from 'react';

import { DarkModeContext } from '@providers/DarkModeProvider';
import { MediaQueryContext } from '@providers/MediaQueryProvider';

interface ModalProps extends BaseModalProps {
  sx?: SxProps<Theme>;
}

export const Modal = ({ sx, ...props }: ModalProps) => {
  const { isSmall, isMedium, isLarge, isXLarge, is2XLarge } = useContext(MediaQueryContext);
  const { isDarkMode } = useContext(DarkModeContext);

  let modalWidth: string;

  if (is2XLarge) {
    modalWidth = '30vw';
  } else if (isXLarge) {
    modalWidth = '35vw';
  } else if (isLarge) {
    modalWidth = '40vw';
  } else if (isMedium) {
    modalWidth = '50vw';
  } else if (isSmall) {
    modalWidth = '60vw';
  } else {
    modalWidth = '80vw';
  }

  return (
    <BaseModal {...props}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: modalWidth,
          borderRadius: '12px',
          boxShadow: 24,
          p: 4,
          paddingTop: '12px',
          maxHeight: '98vh',
          overflowY: 'auto',
          backgroundColor: isDarkMode ? '#222222' : '#d9d9d9',
          '&::-webkit-scrollbar': {
            width: '8px',
            marginRight: '-5px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#1f1f1f',
            borderRadius: '12px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '12px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            cursor: 'pointer',
            background: '#555',
          },
          ...sx,
        }}
      >
        {props.children}
      </Box>
    </BaseModal>
  );
};
