'use client';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField as TextFieldBase, TextFieldProps, styled } from '@mui/material';

const TextField = styled(TextFieldBase)(({ theme }) => ({
  // TODO: We need to design properly on how the colour scheme should work for search field, but for now we can
  // leave it. Ideally this should be the job of a designer
  '& .MuiInputBase-input': {
    backgroundColor: theme.palette.mode == 'dark' ? '#2a3447' : '#ffffff',
    color: theme.palette.mode == 'dark' ? 'white' : 'black',
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
  },
  '& .MuiOutlinedInput-root': {
    borderColor: '#333333',
    borderRadius: '8px',
    paddingRight: 0,

    '&:hover fieldset': {
      borderColor: '#444444',
      borderWidth: '1px',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffffff',
      borderWidth: '1px',
    },
  },
  '& .MuiInputAdornment-root': {
    backgroundColor: theme.palette.mode == 'dark' ? '#2a3447' : '#ffffff',
    padding: '28px 14px',
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    margin: 0,
    '&:hover': {
      backgroundColor: theme.palette.mode == 'dark' ? '#44546a' : '#e8ebf4',
      cursor: 'pointer',
    },
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.mode == 'dark' ? 'white' : 'black',
  },
}));

export const Search = ({ ...props }: TextFieldProps) => {
  return (
    <TextField
      fullWidth
      variant='outlined'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
