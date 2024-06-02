import { useContext } from 'react';
import './DropMenu.scss';
import { DropdownContext } from '../../context/DropdownContext';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../../utils/fetchProducts';

export const DropMenu = () => {
  const dropdownContent = [
    {
      name: 'Про притулок',
      to: '/about',
      img: 'img/dropdown/about.jpg',
    },
    {
      name: 'Щасливі історії',
      to: '/happyStories',
      img: 'img/dropdown/happyStories.jpg',
    },
    {
      name: 'Звіти',
      to: '/reports',
      img: 'img/dropdown/reports.jpg',
    },
    {
      name: 'Правила адапції',
      to: '/adopts',
      img: 'img/dropdown/rules.jpg',
    },
  ];

  const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownContext);
  const style = isDropdownOpen ? 'dropdown-open' : 'dropdown';

  return (
    <>
      {isDropdownOpen && <div className="overlay" /> }
    <div className={style}>
      {dropdownContent.map(item => (
        <NavLink
          to={item.to}
          className="dropdown__item"
          onClick={() => setIsDropdownOpen(false)}
        >
          <p className="dropdown__text">{item.name}</p>
          <img
            src={`${BASE_URL}${item.img}`}
            className='dropdown__img'
            alt={item.name}
          />
        </NavLink>
      ))}
      </div>
      </>
  )
}