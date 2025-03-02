'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { AlertProps, AlertToast } from '@components/Toast';

interface ToastContextType {
  showToast: (alertContent: AlertProps) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);

  const showToast = (alertContent: AlertProps) => {
    setAlertContent(alertContent);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {alertContent && (
        <AlertToast openAlert={open} onClose={handleClose} alertContent={alertContent} />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
