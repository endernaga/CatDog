import React, { useContext, useEffect, useState } from "react";
import "./CategoryPage.scss";
import { Pet } from "../../types/Pet";
import { useLocation, useSearchParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { Filters } from "../../types/sortFilters";
import { BreadCrumb } from "../../components/BreadCrumb";
import { BigSectionsHeader } from "../../components/BigSectionsHeader";
import { Filter } from "../../components/Filter";
import { PetsList } from "../../components/PetsList";
import { Pagination } from "../../components/Pagination";

type Props = {
  pets: Pet[];
  count: number;
  fetchData: () => void;
};

export const CategoryPage:React.FC<Props> = ({ pets, count, fetchData}) => {
  const { filters, setFilters } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const numOfPages = Math.ceil(count / 9);

  const location = useLocation();

  const updateSearchParams = (newFilters: Partial<Filters>) => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    Object.keys(newFilters).forEach((key) => {
      const value = newFilters[key as keyof Filters];

      if (value === undefined || (Array.isArray(value) && value.length === 0)) {
        updatedSearchParams.delete(key);
      } else if (typeof value === "boolean") {
        if (value) {
          updatedSearchParams.set(key, value.toString());
        } else {
          updatedSearchParams.delete(key);
        }
      } else {
        updatedSearchParams.set(key, value.toString());
      }
    });

    setSearchParams(updatedSearchParams);
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    if (!newSearchParams.has("page")) {
      newSearchParams.set("page", "1");
    }
    setFilters({
      sex: searchParams.get("sex")?.split(",") || [],
      size: searchParams.get("size")?.split(",") || [],
      age: searchParams.get("age")?.split(",") || [],
      sterilized: searchParams.get("sterilized") === "true",
      vaccinated: searchParams.get("vaccinated") === "true",
      page: searchParams.get("page"),
    });

    if (location.search !== newSearchParams.toString()) {
      setSearchParams(newSearchParams.toString());
    }
  }, [location.search, setSearchParams, setFilters]);

  return (
    <div className="page">
      <BreadCrumb />
      <BigSectionsHeader text={["Супер", "Друзі"]} />
      <Filter updateSearchParams={updateSearchParams} />
      <PetsList pets={pets} />
      <Pagination
        numOfPages={numOfPages}
        updateSearchParams={updateSearchParams}
      />
    </div>
  );
};
