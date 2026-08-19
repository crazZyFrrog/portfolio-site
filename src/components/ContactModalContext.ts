import { createContext, useContext } from 'react';

export interface ContactModalContextValue {
  openContactModal: (source?: string) => void;
}

export const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const context = useContext(ContactModalContext);

  if (!context) {
    throw new Error('useContactModal must be used inside ContactModalProvider');
  }

  return context;
}
