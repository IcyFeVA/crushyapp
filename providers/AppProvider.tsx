import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getData,
  getUserSearchFilters,
  resetUserSearchFilters,
} from "@/utils/storage";

interface SearchFilters {
  gender: string[];
  age_min: number | null;
  age_max: number | null;
  distance: number | null;
  zodiac_sign: number | null;
  body_type: number | null;
  exercise_frequency: number | null;
  smoking_frequency: number | null;
  drinking_frequency: number | null;
  cannabis_frequency: number | null;
  diet: number | null;
}

interface AppContextType {
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resetFilters: () => void;

  showOnboarding: boolean;
  setShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultSearchFilters: SearchFilters = {
  gender: [],
  age_min: null,
  age_max: null,
  distance: null,
  zodiac_sign: null,
  body_type: null,
  exercise_frequency: null,
  smoking_frequency: null,
  drinking_frequency: null,
  cannabis_frequency: null,
  diet: null,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchFilters, setSearchFilters] =
    useState<SearchFilters>(defaultSearchFilters);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetFilters = () => {
    console.log("Resetting filters");
    setSearchFilters(defaultSearchFilters);
  };

  const fetchFilters = async () => {
    setIsLoading(true);
    try {
      const filters = await getUserSearchFilters();

      console.log("filters >>>>>>>>>>>>>>>>>>", filters);

      // currently filters looks like this: [["zodiac_sign", "9"], ["body_type", "2"], ["min_age", null], ["max_age", null], ["distance", "{\"key\":\"40\",\"value\":\"40\"}"], ["gender", null], ["exercise_frequency", null], ["smoking_frequency", "3"], ["drinking_frequency", "2"], ["cannabis_frequency", "1"], ["diet_preference", null]]
      // we need to convert it to the following: {zodiac_sign: 9, body_type: 2, min_age: null, max_age: null, distance: 40, gender: null, exercise_frequency: null, smoking_frequency: 3, drinking_frequency: 2, cannabis_frequency: 1, diet_preference: null}
      const filtersObj = filters.reduce((acc, filter) => {
        // convert numbers as strings to integers
        if (filter[1] !== null) {
          acc[filter[0]] = parseInt(filter[1]);
        } else {
          acc[filter[0]] = filter[1];
        }
        return acc;
      }, {});

      console.log("filtersObj >>>>>>>>>>>>>>>>>>", filtersObj);

      setSearchFilters(filtersObj);
    } catch (error) {
      console.error("Error fetching filters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  return (
    <AppContext.Provider
      value={{
        searchFilters,
        setSearchFilters,
        resetFilters,
        showOnboarding,
        setShowOnboarding,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
