import { Typography } from '@mui/material';
import { VerticalNavProps } from './types';

interface VerticalNavListProps {
  props: VerticalNavProps[];
}

export const VerticalNav = ({ props }: VerticalNavListProps) => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        borderRadius: '10px',
        flexDirection: 'column',
        gap: '2vh',
        padding: '4%',
      }}
    >
      {props.map((child) => {
        return (
          <>
            <div onClick={child.onClick} style={{ display: 'flex', cursor: 'pointer', gap: '2vw' }}>
              <child.icon sx={{ transform: 'scale(2.0)' }} />
              <Typography>{child.label}</Typography>
            </div>
            <hr />
          </>
        );
      })}
    </div>
  );
};
