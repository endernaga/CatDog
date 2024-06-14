import classNames from 'classnames';
import { Filters } from '../../types/sortFilters';
import './FiltersCheck.scss';

type CheckboxProps = {
  filterType: keyof Omit<Filters, 'sterilized' | 'vaccinated'>;
  filterData: Record<string, string>;
  selectedFilters: string[],
  onCheckboxChange: (type: keyof Filters, key: string, checked: boolean) => void,
};

type ToggleProps = {
  checked: boolean,
  label: string,
  onToggle: (checked: boolean) => void,
};

export const Checkbox: React.FC<CheckboxProps> = ({
  filterData,
  filterType,
  selectedFilters,
  onCheckboxChange,
}) => {
  return (
    <>
      {Object.entries(filterData).map(([key, value]) => (
        <label className={classNames("checkbox", {
          'checkbox--checked': selectedFilters.includes(key),
        })} key={key}>
          <input
            type="checkbox"
            id="filterCheckbox"
            name={key}
            checked={selectedFilters.includes(key)}
            onChange={(e) => onCheckboxChange(filterType, key, e.target.checked)}
          />
          <span className="checkmark"></span>
          {value}
        </label>
      ))}
    </>
  );
};

export const ToggleBox: React.FC<ToggleProps> = ({
  checked,
  onToggle,
}) => {
  const handleToggle = () => onToggle(!checked);
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={handleToggle} />
      <span className="switch__slider"></span>
    </label>
  )
}