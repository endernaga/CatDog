import { AnimalButton } from "../Buttons";
import "./Filter.scss";
import React, { useContext, useEffect, useState } from "react";
import { ModalWindow } from "../ModalWindow";
import { GlobalContext } from "../../context/GlobalContext";
import {
  Filters,
  ageFilter,
  sexFilter,
  sizeFilter,
} from "../../types/sortFilters";
import { useSearchParams } from "react-router-dom";

type Props = {
  updateSearchParams: (newFilters: Partial<Filters>) => void,
}

export const Filter:React.FC<Props> = ({updateSearchParams}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { filters, setFilters } = useContext(GlobalContext);

  let numOfFilters = 0;

  Object.values(filters).forEach((value) => {
    if (Array.isArray(value) && value.length > 0) {
      numOfFilters += value.length;
    } else if (typeof value === "boolean" && value) {
      numOfFilters++;
    }
  });

  const sortFilters = {
    sexFilter,
    ageFilter,
    sizeFilter,
  };

  const findParam = (v: string) => {
    for (const [key, value] of Object.entries(sortFilters)) {
      for (const [innerKey, innerValue] of Object.entries(value)) {
        if (innerKey === v) {
          return innerValue;
        }
      }
    }
    return undefined;
  };

  const giveParamForBoolean = (k: string) => {
    if (k === "sterilized") {
      return "Стерилозовані";
    }

    return "Вакциновані";
  };

  console.log(filters);

  return (
    <div className="filter">
      <div className="filter__buttons">
        <div className="filter__types">
          <AnimalButton to="pets" title="Усі" />
          <AnimalButton to="pets/dogs" title="Песики" />
          <AnimalButton to="pets/cats" title="Котики" />
        </div>
        <div
          className="filter__icon"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <div className="filter__counter">{numOfFilters}</div>
        </div>
        <ModalWindow
          isOpen={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
          handleUpdateParams={updateSearchParams}
        />
      </div>

      {numOfFilters > 0 && (
        <div className="filter__list">
          {Object.entries(filters).map(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
              return value.map((item) => (
                <div className="filter__item" key={`${key}-${item}`}>
                  <p className="filter__item__text">{findParam(`${item}`)}</p>
                  <div
                    className="icon icon-close"
                    onClick={() => updateSearchParams({ [key]: value.filter(param => param !== item) })}
                  ></div>
                </div>
              ));
            } else if (typeof value === "boolean" && value === true) {
              return (
                <div className="filter__item" key={key}>
                  <p className="filter__item__text">
                    {giveParamForBoolean(`${key}`)}
                  </p>
                  <div
                    className="icon icon-close"
                    onClick={() => updateSearchParams({ [key]: false })}
                  ></div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};
