import { MouseEvent } from 'react';
import { Download } from '@mui/icons-material';
import { Note } from '@api/library';
import { ButtonBase } from '@mui/material';

interface DownloadIconProps {
  handleDownloadNote: (event: MouseEvent<HTMLAnchorElement>, note: Note) => Promise<void>;
  note: Note;
}

export const DownloadIcon = ({ handleDownloadNote, note }: DownloadIconProps) => (
  <ButtonBase
    className='admin-actions'
    href='#'
    onClick={(event) => handleDownloadNote(event, note)}
  >
    <Download className='admin-icon' />
  </ButtonBase>
);
