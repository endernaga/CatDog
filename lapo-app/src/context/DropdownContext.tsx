import React, { createContext, useState } from "react";

export const DropdownContext = createContext({
  isDropdownOpen: false,
  setIsDropdownOpen: (v: boolean) => {},
})

export const DropdownProvider = ({children}: {children: React.ReactNode}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isDropdownOpen, setIsDropdownOpen }}>
      {children}
    </DropdownContext.Provider>
  )
}