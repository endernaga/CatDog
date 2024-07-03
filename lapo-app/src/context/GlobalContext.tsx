import React, { createContext, useEffect, useState } from "react";
import { Filters } from "../types/sortFilters";
import { getCats, getDogs } from "../utils/fetchProducts";
import { Pet } from "../types/Pet";

export const initialFilters: Filters = {
  sex: [],
  size: [],
  age: [],
  sterilized: false,
  vaccinated: false,
  page: '1',
};

export const GlobalContext = createContext({
  isDropmenuOpen: false,
  setIsDropmenuOpen: (v: boolean) => { },
  isSosFormOpen: false,
  setIsSosFormOpen: (v: boolean) => { },
  scrollToSection: (id: string) => {},
  filters: initialFilters,
  setFilters: (v: any) => { },
  isLoading: false,
  setIsLoading: (v: boolean) => { },
})

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
  const [isDropmenuOpen, setIsDropmenuOpen] = useState(false);
  const [isSosFormOpen, setIsSosFormOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cats, setCats] = useState<Pet[]>([]);
  const [dogs, setDogs] = useState<Pet[]>([]);

  useEffect(() => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
        setTargetId(null);
      }
    }
  }, [targetId]);

  const scrollToSection = (id: string) => {
    setTargetId(id);
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    setIsLoading(true);
    getCats().then(data => setCats(data)).catch(error => {
      console.error('Error fetching cats:', error);
    });

    getDogs().then(data => setDogs(data)).catch(error => {
      console.error('Error fetching dogs:', error);
    });
    setIsLoading(false);

  }, []);

  return (
    <GlobalContext.Provider
      value={{ 
        isDropmenuOpen, 
        setIsDropmenuOpen,
        filters, 
        setFilters, 
        isSosFormOpen,
        setIsSosFormOpen,
        scrollToSection,
        isLoading,
        setIsLoading
      }}>
      {children}
    </GlobalContext.Provider>
  )
}