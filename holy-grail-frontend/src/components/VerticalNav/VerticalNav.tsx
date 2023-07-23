import { Typography } from '@mui/material';
import { VerticalNavProps } from './types';
import { useState, useContext } from 'react';
import { MediaQueryContext } from '@providers';

interface VerticalNavListProps {
  props: VerticalNavProps[];
}

export const VerticalNav = ({ props }: VerticalNavListProps) => {
  const [selected, setSelected] = useState<number>(0);
  const { isDesktop } = useContext(MediaQueryContext);
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        borderRadius: '10px',
        flexDirection: 'column',
        gap: '2vh',
        padding: '3%',
        marginTop: '10vh',
        width: '20vw',
      }}
    >
      {props.map((child, idx) => {
        return (
          <>
            <div
              onClick={() => {
                setSelected(idx);
                child.onClick();
              }}
              style={{ display: 'flex', cursor: 'pointer', gap: '2vw' }}
            >
              <child.icon sx={{ transform: 'scale(2.0)', flexGrow: 1 }} />
              {isDesktop ? (
                <Typography sx={{ fontWeight: idx === selected ? 'bold' : null, flexGrow: 1 }}>
                  {child.label}
                </Typography>
              ) : null}
            </div>
            <hr />
          </>
        );
      })}
    </div>
  );
};
