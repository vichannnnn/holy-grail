import { Badge, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ReactNode, useContext } from 'react';

import { DarkModeContext } from '@providers/DarkModeProvider';

interface SidebarListItemProps {
  name: string;
  icon: ReactNode;
  selected: boolean;
  onClick: () => void;
  badgeContent?: number;
}

export const SidebarListItem = ({
  name,
  icon,
  selected,
  onClick,
  badgeContent,
}: SidebarListItemProps) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={selected}
        onClick={onClick}
        sx={{
          backgroundColor: selected ? '#6684FF' : 'transparent',
          color: selected ? '#253662' : 'black',
          borderRadius: '8px',
          mx: 1,
          '&:hover': { backgroundColor: isDarkMode ? '#253662' : '#ecf2ff' },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} />

        {badgeContent !== undefined && (
          <Badge
            badgeContent={badgeContent}
            color='primary'
            sx={{ '.MuiBadge-badge': { fontSize: '10px', height: '18px', minWidth: '18px' } }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};
