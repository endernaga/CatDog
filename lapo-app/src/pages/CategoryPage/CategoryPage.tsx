import React, { useContext, useEffect } from 'react';
import './CategoryPage.scss';
import { Pet } from '../../types/Pet';
import { useSearchParams } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { Filters } from '../../types/sortFilters';
import { BreadCrumb } from '../../components/BreadCrumb';
import { BigSectionsHeader } from '../../components/BigSectionsHeader';
import { Filter } from '../../components/Filter';
import { PetsList } from '../../components/PetsList';
import { Pagination } from '../../components/Pagination';

type Props = {
  pets: Pet[]
}

export const CategoryPage: React.FC<Props> = ({pets}) => {
  const numOfPages = Math.ceil(pets.length / 9);

  const { filters, setFilters } = useContext(GlobalContext);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setFilters({
      sex: searchParams.get("sex")?.split(",") || [],
      size: searchParams.get("size")?.split(",") || [],
      age: searchParams.get("age")?.split(",") || [],
      sterilized: searchParams.get("sterilized") === "true",
      vaccinated: searchParams.get("vaccinated")  === "true",
      page: searchParams.get("page")
        ? parseInt(searchParams.get("page") as string)
        : 1,
    });
  }, [searchParams, setSearchParams]);


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
  return (
    <div className="page">
      <BreadCrumb />
      <BigSectionsHeader text={['Супер', 'Друзі']} />
      <Filter updateSearchParams={updateSearchParams} />
      <PetsList />
      <Pagination numOfPages={numOfPages} updateSearchParams={updateSearchParams} />
    </div>
  )
}