import React, { createContext, useState } from "react";
import { FilterType, Filters } from "../types/sortFilters";
import { initialFilters } from "../components/ModalWindow";

export const GlobalContext = createContext({
  isDropmenuOpen: false,
  setIsDropmenuOpen: (v: boolean) => { },
  filters: initialFilters,
  setFilters: (v: any) => { },
  handleRemoveFilter: (type: FilterType, value: string | boolean) => {},
})

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
  const [isDropmenuOpen, setIsDropmenuOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(initialFilters);

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
    <GlobalContext.Provider value={{ isDropmenuOpen, setIsDropmenuOpen, filters, setFilters, handleRemoveFilter }}>
      {children}
    </GlobalContext.Provider>
  )
}