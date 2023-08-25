import { MouseEvent } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './NoteOptionsIcon.css';

interface NoteOptionsIconProps {
  onClick: (event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => void;
}

export const NoteOptionsIcon = ({ onClick }: NoteOptionsIconProps) => (
  <MoreHorizIcon className='note-options-icon' onClick={(event) => onClick(event)} />
);
