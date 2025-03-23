import { Download } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';
import { MouseEvent } from 'react';

import { Note } from '@api/library';

interface DownloadIconProps {
  handleDownloadNote: (event: MouseEvent<HTMLAnchorElement>, note: Note) => Promise<void>;
  note: Note;
}

export const DownloadIcon = ({ handleDownloadNote, note }: DownloadIconProps) => (
  <ButtonBase href='#' onClick={(event) => handleDownloadNote(event, note)}>
    <Download className='download-icon' />
  </ButtonBase>
);
