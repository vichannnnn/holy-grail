export interface AlertProps {
  title: string;
  description: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}
