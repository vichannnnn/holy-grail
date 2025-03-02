'use client';

import { SidebarListItem } from '@layouts/Sidebar/SidebarListItem';
import { SidebarItemsEnum } from '@layouts/Sidebar/enum';
import { Public, ShoppingCart } from '@mui/icons-material';
import { Drawer, List, ListSubheader } from '@mui/material';
import Image from 'next/image';
import { useContext, useState } from 'react';

import { DarkModeContext } from '@providers/DarkModeProvider';

const sidebarItems = {
  HOME: [
    { name: 'Modern', icon: <Public />, value: SidebarItemsEnum.MODERN },
    { name: 'eCommerce', icon: <ShoppingCart />, value: SidebarItemsEnum.ECOMMERCE },
    { name: 'Dark Mode', icon: <ShoppingCart />, value: SidebarItemsEnum.DARK_MODE },
  ],
  APPS: [],
};

export const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState<SidebarItemsEnum>(SidebarItemsEnum.MODERN);
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      anchor='left'
      variant='permanent'
    >
      <div className='flex flex-row gap-4 items-center p-4 mr-12'>
        <Image src='/flower.png' alt='Header Logo' height='32' width='32' priority={true} />
        <h2 className='font-bold text-hima-dark dark:text-hima-white'>Modernize</h2>
      </div>
      <List>
        {Object.entries(sidebarItems).map(([category, items]) => (
          <div key={category}>
            <ListSubheader className='font-bold mb-2'>{category}</ListSubheader>
            {items.map(({ name, icon, value }) => (
              <SidebarListItem
                key={name}
                name={name}
                icon={icon}
                selected={selectedItem === value}
                onClick={() => {
                  if (value === SidebarItemsEnum.DARK_MODE) {
                    toggleDarkMode();
                  }
                  setSelectedItem(value);
                }}
              />
            ))}
          </div>
        ))}
      </List>
    </Drawer>
  );
};
