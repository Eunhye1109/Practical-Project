// contexts/LoadingContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  label: string;
  setLabel: (label: string) => void;
  url: string;
  setUrl: (url: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [label, setIsLabel] = useState('');
  const [url, setIsUrl] = useState('');

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };
  const setLabel = (label: string) => {
    setIsLabel(label);
  };
  const setUrl = (url: string) => {
    setIsUrl(url);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, label, setLabel, url, setUrl }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};
