// src/context/DropOffContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface DropOffItem {
  userId: string;
  material: string;
}

interface DropOffContextProps {
  dropOffs: DropOffItem[];
  addDropOff: (item: DropOffItem) => void;
}

const DropOffContext = createContext<DropOffContextProps | undefined>(undefined);

interface DropOffProviderProps {
  children: ReactNode;
}

export const DropOffProvider: React.FC<DropOffProviderProps> = ({ children }) => {
  const [dropOffs, setDropOffs] = useState<DropOffItem[]>([]);

  const addDropOff = (item: DropOffItem) => {
    setDropOffs((prev) => [...prev, item]);
  };

  return (
    <DropOffContext.Provider value={{ dropOffs, addDropOff }}>
      {children}
    </DropOffContext.Provider>
  );
};

export const useDropOffContext = (): DropOffContextProps => {
  const context = useContext(DropOffContext);
  if (!context) {
    throw new Error('useDropOffContext must be used within a DropOffProvider');
  }
  return context;
};
