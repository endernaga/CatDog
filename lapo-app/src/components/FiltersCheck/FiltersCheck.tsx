import classNames from 'classnames';
import { Filters } from '../../types/sortFilters';
import './FiltersCheck.scss';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

type CheckboxProps = {
  filterType: keyof Omit<Filters, 'sterilized' | 'vaccinated' | 'page'>;
  filterData: Record<string, string>;
  onCheckboxChange: (checked: boolean, value: string) => void,
};

type ToggleProps = {
  filterType: keyof Omit<Filters, 'size' | 'sex' | 'page' | 'age'>,
  onToggle: () => void
};

export const Checkbox: React.FC<CheckboxProps> = ({
  filterData,
  filterType,
  onCheckboxChange,
}) => {
  const { filters } = useContext(GlobalContext);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    setSelectedItems(filters[filterType]);
  }, [filters]);
  
  const onClick = (checked: boolean, key: string) => { 
    onCheckboxChange(checked, key);
    if (!!checked) {
      setSelectedItems(prevItems => [...prevItems, key]);
    } else {
      setSelectedItems(prevItems => prevItems.filter(item => item !== key));
    }
  };

  return (
    <>
      {Object.entries(filterData).map(([key, value]) => (
        <label className={classNames("checkbox", {
          'checkbox--checked': selectedItems.includes(key),
        })} key={key}>
          <input
            type="checkbox"
            id="filterCheckbox"
            name={key}
            checked={selectedItems.includes(key)}
            onChange={(e) => onClick(e.target.checked, key)}
          />
          <span className="checkmark"></span>
          {value}
        </label>
      ))}
    </>
  );
};

export const ToggleBox: React.FC<ToggleProps> = ({
  onToggle,
  filterType
}) => {
  const { filters } = useContext(GlobalContext);
  const [status, setStatus] = useState<boolean>();

  useEffect(() => {
    setStatus(filters[filterType]);
  }, [filters])

  const onClick = (checked: boolean) => { 
    onToggle();
    setStatus(checked);
  };
  return (
    <label className="switch">
      <input type="checkbox" checked={status} onChange={(e) => onClick(e.target.checked)} />
      <span className="switch__slider"></span>
    </label>
  )
}