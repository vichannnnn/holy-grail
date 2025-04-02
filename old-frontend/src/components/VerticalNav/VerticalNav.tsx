import { Typography } from '@mui/material';
import { VerticalNavProps } from './types';

export const VerticalNav = ({ props }: { props: VerticalNavProps[] }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2vh',
        padding: '3%',
        marginTop: '10vh',
        width: '15vw',
        justifyContent: 'space-around',
      }}
    >
      {props.map((child, _) => {
        return (
          <>
            <div
              onClick={() => {
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
              {
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    textDecoration: child.active ? 'underline' : null,
                    flexGrow: 1,
                  }}
                >
                  {child.label}
                </Typography>
              }
            </div>
            <hr />
          </>
        );
      })}
    </div>
  );
};
