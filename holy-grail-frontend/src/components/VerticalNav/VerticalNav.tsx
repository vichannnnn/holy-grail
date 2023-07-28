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
        flexDirection: 'column',
        gap: '2vh',
        padding: '3%',
        marginTop: '10vh',
        width: '20vw',
        justifyContent: 'space-around',
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
              style={{
                display: 'flex',
                cursor: 'pointer',
                gap: '2vw',
                justifyContent: 'flex-start',
              }}
            >
              <child.icon sx={{ transform: 'scale(1.2)', display: 'absolute' }} />
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
