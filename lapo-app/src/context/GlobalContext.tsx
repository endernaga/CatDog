import React, { createContext, useEffect, useState } from "react";
import { FilterType, Filters } from "../types/sortFilters";
import { initialFilters } from "../components/ModalWindow";

export const GlobalContext = createContext({
  isDropmenuOpen: false,
  setIsDropmenuOpen: (v: boolean) => { },
  isSosFormOpen: false,
  setIsSosFormOpen: (v: boolean) => { },
  scrollToSection: (id: string) => {},
  filters: initialFilters,
  setFilters: (v: any) => { },
  handleRemoveFilter: (type: FilterType, value: string | boolean) => {},
})

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
  const [isDropmenuOpen, setIsDropmenuOpen] = useState(false);
  const [isSosFormOpen, setIsSosFormOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setTargetId(null);
      }
    }
  }, [targetId]);

  const scrollToSection = (id: string) => {
    setTargetId(id);
  };

  const handleRemoveFilter = (type: FilterType, value: string | boolean) => {
    setFilters((prevFilters) => {
      const updatedFilters:Filters = { ...prevFilters };

      if (Array.isArray(prevFilters[type])) {
        updatedFilters[type] = (prevFilters[type] as string[]).filter((item) => item !== value) as any;
      } else {
        updatedFilters[type] = false as any;
      }
      return updatedFilters;
    });
  };

  return (
    <GlobalContext.Provider
      value={{ 
        isDropmenuOpen, 
        setIsDropmenuOpen,
        filters, 
        setFilters, 
        handleRemoveFilter, 
        isSosFormOpen,
        setIsSosFormOpen,
        scrollToSection,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}