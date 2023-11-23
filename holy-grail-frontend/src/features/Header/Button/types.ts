import { User } from '@providers';

export interface DropdownRenderProps {
  user: User | null;
  isDesktop: boolean;
  logout: () => void;
}
