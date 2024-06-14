import React, { useContext, useEffect, useState } from "react";
import "./ModalWindow.scss";
import { FilterType, Filters, ageFilter, sexFilter, sizeFilter, } from "../../types/sortFilters";
import { useSearchParams } from "react-router-dom";
import { Checkbox, ToggleBox } from "../FiltersCheck";
import { GlobalContext } from "../../context/GlobalContext";
import { BASE_URL } from "../../utils/fetchProducts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const initialFilters: Filters = {
  sex: [],
  size: [],
  age: [],
  sterilized: false,
  vaccinated: false,
};

export const ModalWindow: React.FC<Props> = ({ isOpen, onClose }) => {
  const style = isOpen ? "window-open" : "window";

  const [searchParams, setSearchParams] = useSearchParams();
  const {filters, setFilters} = useContext(GlobalContext);

  const [filteredPets, setFilteredPets] = useState([])

  const onCheckboxChange = (type: FilterType, value: string, checked: boolean) => {
    if (type === 'sterilized' || type === 'vaccinated') {
      setFilters((prevFilters:Filters) => ({
        ...prevFilters,
        [type]: checked,
      }));
    } else {
      setFilters((prevFilters:Filters) => {
        const updatedFilters = { ...prevFilters };
        if (checked) {
          updatedFilters[type] = [...updatedFilters[type], value];
        } else {
          updatedFilters[type] = updatedFilters[type].filter((filter) => filter !== value);
        }
        return updatedFilters;
      });
    }
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams();
    (Object.entries(filters) as [keyof Filters, string[]][]).forEach(([key, values]) => {
      if (values.length > 0) {
        newParams.set(key, values.join(','));
      }
    });
    setSearchParams(newParams);

    fetch(`${BASE_URL}/api/filter?${newParams.toString()}`)//тут буде api від бекенду
      .then((response) => response.json())
      .then((data) => {
        setFilteredPets(data);
      });
    
    onClose();
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearchParams(new URLSearchParams());

    fetch(`${BASE_URL}/api/filter`)//тут буде api від бекенду
      .then((response) => response.json())
      .then((data) => {
        setFilteredPets(data);
    })
  }

  return (
    <>
      {isOpen && <div className="overlay overlay-for-modal" />}
      <div className={style}>
        <div className="window__header">
          <p className="window__header__text">Фільтри</p>
          <div className="icon icon-close icon-close-form" onClick={onClose}></div>
        </div>

        <div className="window__filters">
          <div className="window__filter">
            <div className="window__param">Стать</div>
            <div className="window__options">
              <Checkbox filterData={sexFilter} filterType="sex" selectedFilters={filters.sex} onCheckboxChange={onCheckboxChange} />
            </div>
          </div>

          <div className="window__filter">
            <div className="window__param">Розмір</div>
            <div className="window__options">
              <Checkbox filterData={sizeFilter} filterType="size" selectedFilters={filters.size} onCheckboxChange={onCheckboxChange} />
            </div>
          </div>

          <div className="window__filter">
            <div className="window__param">Вік</div>
            <div className="window__options">
              <Checkbox filterData={ageFilter} filterType="age" selectedFilters={filters.age} onCheckboxChange={onCheckboxChange} />
            </div>
          </div>
        </div>

        <div className="window__toggles">
          <div className="window__toggles__item">
            <p className="window__param">Стерилізовані</p>
          <ToggleBox label="Стерилізовані" checked={filters.sterilized} onToggle={(checked) => onCheckboxChange('sterilized', '', checked)} />
          </div>
          <div className="window__toggles__item">
            <p className="window__param">Вакциновані</p>
            <ToggleBox label="Вакциновані" checked={filters.vaccinated} onToggle={(checked) => onCheckboxChange('vaccinated', '', checked)} />
          </div>
        </div>

        <div className="window__footer">
          <button onClick={clearFilters} className="window__clear">
            <p className="window__clear__text">Очистити</p>
          </button>
          <button onClick={applyFilters} className="mediumButton">
            <p className="text">Застосувати</p>
          </button>
        </div>

      
      </div>
    </>
  );
};
