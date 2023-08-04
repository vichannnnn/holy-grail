import { SvgIconComponent } from '@mui/icons-material';

export interface VerticalNavProps {
  icon: SvgIconComponent;
  label: string;
  onClick: () => void;
  active?: boolean;
}
