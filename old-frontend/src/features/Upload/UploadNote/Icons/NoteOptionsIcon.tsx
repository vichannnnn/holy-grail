import { MouseEvent } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface NoteOptionsIconProps {
  onClick: (event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => void;
}

export const NoteOptionsIcon = ({ onClick }: NoteOptionsIconProps) => (
  <MoreHorizIcon
    style={{ border: 'none', cursor: 'pointer' }}
    onClick={(event) => onClick(event)}
  />
);
