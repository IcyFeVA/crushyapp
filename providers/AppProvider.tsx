import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  // Define your global state properties here
  theme: string;
  setTheme: (theme: string) => void;
  myData: any;
  setMyData: (data: any) => void;
  mySearchFilters: any;
  setMySearchFilters: (filters: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [myData, setMyData] = useState<any>({});
  const [mySearchFilters, setMySearchFilters] = useState<any>({});

  return (
    <AppContext.Provider value={{
      theme,
      setTheme,
      myData,
      setMyData,
      mySearchFilters,
      setMySearchFilters,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};