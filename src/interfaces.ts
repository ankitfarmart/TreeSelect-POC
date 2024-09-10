import { ReactNode } from "react";

export type ToastType = 'success' | 'neutral' | 'danger' | 'warning' | 'primary';

export type ToastVariant = 'soft' | 'solid' | 'outlined' | 'plain';

export interface Toast {
  id: string;
  message: string | ReactNode;
  type: ToastType;
  duration?: number;
  variant?: ToastVariant;
  startDecorator?: ReactNode|''; 
  endDecorator?: ReactNode|'';  
}

export interface ToastContextType {
    addToast: (message: string | ReactNode, type: ToastType, duration?: number, variant?: ToastVariant,startDecorator?:ReactNode,endDecorator?:ReactNode) => void;
}

export interface ToastProviderProps {
    children: ReactNode;
    defaultDuration?: number; 
  }
  