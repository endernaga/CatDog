import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { DropdownContext } from '../../context/DropdownContext';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar__link', {
      'navbar__link--active': isActive,
    });

  /*const getAboutLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar__about', {
      'navbar__about--active': isActive,
    }); */

  const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__about" onClick={toggleDropdown}>
        <p className={classNames("navbar__about__text", {
          "navbar__about__text--active": isDropdownOpen,
        })}>Про нас</p>
        <div className={classNames('icon', {
          'icon-up': isDropdownOpen,
          'icon-down': !isDropdownOpen,
        })} />
      </div>
      <NavLink to="/pets" className={getLinkClass}>
        Знайти друга
      </NavLink>
      <NavLink to="/contact" className={getLinkClass}>
        Контакти
      </NavLink>
      <NavLink to="/game" className={getLinkClass}>
        Він чи вона?
      </NavLink>
    </nav>
  );
};
