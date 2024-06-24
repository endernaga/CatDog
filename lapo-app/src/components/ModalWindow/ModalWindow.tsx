import React, { useContext, useEffect, useState } from "react";
import "./ModalWindow.scss";
import {
  Filters,
  ageFilter,
  sexFilter,
  sizeFilter,
} from "../../types/sortFilters";
import { Checkbox, ToggleBox } from "../FiltersCheck";
import { GlobalContext, initialFilters } from "../../context/GlobalContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleUpdateParams: (newFilters: Partial<Filters>) => void;
};

export const ModalWindow: React.FC<Props> = ({
  isOpen,
  onClose,
  handleUpdateParams,
}) => {
  const { filters } = useContext(GlobalContext);

  const style = isOpen ? "window-open" : "window";
  const [sex, setSex] = useState<string[]>([]);
  const [age, setAge] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [sterilized, setSterilized] = useState<boolean>(false);
  const [vaccinated, setVaccinated] = useState<boolean>(false);

  const sexChange = (checked: boolean, value: string) => {
    if (checked) {
      setSex((prevSex) => [...prevSex, value]);
    } else {
      setSex((prevSex) => prevSex.filter((item) => item !== value));
    }
  };

  const sizeChange = (checked: boolean, value: string) => {
    if (checked) {
      setSize(prevSize => [...prevSize, value]);
    } else {
      setSize((prevSize) => prevSize.filter((item) => item !== value));
    }
  };

  const ageChange = (checked: boolean, value: string) => {
    if (checked) {
      setAge((prevAge) => [...prevAge, value]);
    } else {
      setAge((prevAge) => prevAge.filter((item) => item !== value));
    }
  };

  const handleApplyFilters = () => {
    console.log(sterilized);
    console.log(vaccinated);
    handleUpdateParams({
      sex: sex,
      size: size,
      age: age,
      sterilized: sterilized,
      vaccinated: vaccinated,
    });
    onClose();
  };

  useEffect(() => {
    setSex(filters.sex);
    setAge(filters.age);
    setSize(filters.size);
    setSterilized(filters.sterilized);
    setVaccinated(filters.vaccinated);
  }, [filters]);


  return (
    <>
      {isOpen && <div className="overlay" />}
      <div className={style}>
        <div className="window__header">
          <p className="window__header__text">Фільтри</p>
          <div
            className="icon icon-close icon-close-form"
            onClick={onClose}
          ></div>
        </div>

        <div className="window__filters">
          <div className="window__filter">
            <div className="window__param">Стать</div>
            <div className="window__options">
              <Checkbox
                filterData={sexFilter}
                filterType="sex"
                onCheckboxChange={sexChange}
              />
            </div>
          </div>

          <div className="window__filter">
            <div className="window__param">Розмір</div>
            <div className="window__options">
              <Checkbox
                filterData={sizeFilter}
                filterType="size"
                onCheckboxChange={sizeChange}
              />
            </div>
          </div>

          <div className="window__filter">
            <div className="window__param">Вік</div>
            <div className="window__options">
              <Checkbox
                filterData={ageFilter}
                filterType="age"
                onCheckboxChange={ageChange}
              />
            </div>
          </div>
        </div>

        <div className="window__toggles">
          <div className="window__toggles__item">
            <p className="window__param">Стерилізовані</p>
            <ToggleBox filterType="sterilized" onToggle={() => setSterilized(!sterilized)} />
          </div>
          <div className="window__toggles__item">
            <p className="window__param">Вакциновані</p>
            <ToggleBox filterType="vaccinated" onToggle={() => setVaccinated(!vaccinated)} />
          </div>
        </div>

        <div className="window__footer">
          <button
            onClick={() => handleUpdateParams(initialFilters)}
            className="window__clear"
          >
            <p className="window__clear__text">Очистити</p>
          </button>
          <button onClick={handleApplyFilters} className="mediumButton">
            <p className="text">Застосувати</p>
          </button>
        </div>
      </div>
    </>
  );
};
