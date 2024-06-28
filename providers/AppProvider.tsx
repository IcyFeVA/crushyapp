import React, { createContext, useContext, useState } from 'react';

interface FilterPreference {
  key: string;
  value: string | string[];
}

interface SearchFilters {
  genderPreference: FilterPreference;
  ageRange: {
    min: number;
    max: number;
  };
  distance: FilterPreference;
  starSignPreference: FilterPreference;
}

interface AppContextType {
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resetFilters: () => void;
}

const defaultSearchFilters: SearchFilters = {
  genderPreference: { key: '', value: [] },
  ageRange: { min: 18, max: 35 },
  distance: { key: '', value: '' },
  starSignPreference: { key: '', value: '' },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(defaultSearchFilters);

  const resetFilters = () => {
    console.log('Resetting filters');
    setSearchFilters(defaultSearchFilters);
  };

  return (
    <AppContext.Provider value={{
      searchFilters,
      setSearchFilters,
      resetFilters,
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