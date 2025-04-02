'use client';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputAdornment, TextFieldProps, styled } from '@mui/material';
import { MouseEvent, forwardRef, useState } from 'react';

import { TextField } from '@components/TextField/TextField';

const CustomPasswordTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
  },
  '& .MuiFormHelperText-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiInputAdornment-root': {
    padding: '28px 14px',
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    margin: 0,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? '#333333' : '#d3d3d3',
      cursor: 'pointer',
    },
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.mode === 'dark' ? '#e5e5e5' : '#484b6a',
  },
}));

export const PasswordField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const AdornmentWrapper = ({
    onMouseDown,
    onClick,
  }: {
    onMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
    onClick: () => void;
  }) => (
    <div onMouseDown={onMouseDown} onClick={onClick} style={{ cursor: 'pointer' }}>
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </div>
  );

  return (
    <CustomPasswordTextField
      fullWidth
      variant='outlined'
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <AdornmentWrapper
              onMouseDown={handleMouseDownPassword}
              onClick={handleClickShowPassword}
            />
          </InputAdornment>
        ),
      }}
      ref={ref}
      {...props}
    />
  );
});

PasswordField.displayName = 'PasswordField';
