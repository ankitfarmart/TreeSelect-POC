import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar from '@mui/joy/Snackbar';
import { v4 as uuidv4 } from 'uuid';
import { Grid } from '@mui/joy';
import { Toast, ToastContextType, ToastProviderProps, ToastType, ToastVariant } from './interfaces';


/**
 * ToastContext is a context that provides access to the toast functionality.
 * @type {React.Context<ToastContextType | undefined>}
 */
const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Custom hook that provides access to the ToastContext.
 * @returns The ToastContext object.
 * @throws {Error} If used outside of a ToastProvider.
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children, defaultDuration }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Adds a toast notification to the list of toasts.
   * 
   * @param message - The message or ReactNode to display in the toast.
   * @param type - The type of the toast.
   * @param duration - The duration in milliseconds for which the toast should be displayed. Default is 3000ms.
   * @param variant - The variant of the toast. Default is 'soft'.
   */


  const addToast = (message: string | ReactNode, type: ToastType, duration = defaultDuration || 3000, variant: ToastVariant = 'soft',
    startDecorator: ReactNode | '' = '', endDecorator: ReactNode | '' = '') => {
    const id = uuidv4();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration, variant, startDecorator, endDecorator }]);

    // Set timeout to remove the toast after its duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };


  /**
   * Removes a toast from the list of toasts.
   * @param id - The ID of the toast to be removed.
   */
  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Grid container flexDirection="column" position="absolute" top={20} right={10} minWidth={350} gap={1}>
        {toasts.map((toast) => (
          <Snackbar
            key={toast.id}
            open={true}
            variant={toast.variant}
            color={toast.type}
            sx={{ position: 'relative' }}
            startDecorator={toast.startDecorator}
            endDecorator={toast.endDecorator}
            size='md'
          >
            {toast.message}
          </Snackbar>
        ))}
      </Grid>
    </ToastContext.Provider>
  );
};

/**
 * Custom hook for toast actions.
 * @returns Object containing different toast actions.
 */
export const useToastActions = () => {
  const { addToast } = useToast();

  const createToast = (
    type: 'success' | 'primary' | 'danger' | 'warning' | 'neutral',
    message: string | ReactNode,
    options?: {
      duration?: number;
      variant?: ToastVariant;
      startDecorator?: ReactNode;
      endDecorator?: ReactNode;
    }
  ) =>
    addToast(
      message,
      type,
      options?.duration,
      options?.variant,
      options?.startDecorator,
      options?.endDecorator
    );

  return {
    success: (message: string | ReactNode, options?: any) => createToast('success', message, options),
    primary: (message: string | ReactNode, options?: any) => createToast('primary', message, options),
    danger: (message: string | ReactNode, options?: any) => createToast('danger', message, options),
    warning: (message: string | ReactNode, options?: any) => createToast('warning', message, options),
    neutral: (message: string | ReactNode, options?: any) => createToast('neutral', message, options),
  };
};
