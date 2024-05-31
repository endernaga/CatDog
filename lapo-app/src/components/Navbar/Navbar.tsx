import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import classNames from 'classnames';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar__link', {
      'navbar__link--active': isActive,
    });

  const getAboutLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar__about', {
      'navbar__about--active': isActive,
    });

  return (
    <nav className="navbar">
      <NavLink to="/about" className={getAboutLinkClass}><div className="icon icon-down"></div></NavLink>
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
