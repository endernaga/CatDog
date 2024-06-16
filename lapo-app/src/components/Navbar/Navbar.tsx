import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import classNames from "classnames";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames("navbar__link", {
      "navbar__link--active": isActive,
    });

  /*const getAboutLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar__about', {
      'navbar__about--active': isActive,
    }); */

  const { isDropmenuOpen, setIsDropmenuOpen } = useContext(GlobalContext);

  const toggleDropdown = () => {
    setIsDropmenuOpen(!isDropmenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__about" onClick={toggleDropdown}>
        <p
          className={classNames("navbar__about__text", {
            "navbar__about__text--active": isDropmenuOpen,
          })}
        >
          Про нас
        </p>
        <div
          className={classNames("icon", {
            "icon-up": isDropmenuOpen,
            "icon-down": !isDropmenuOpen,
          })}
        />
      </div>
      <NavLink to="/pets" className={getLinkClass}>
        Знайти друга
      </NavLink>
      <NavLink to="/contacts" className={getLinkClass}>
        Контакти
      </NavLink>
      <NavLink to="/game" className={getLinkClass}>
        Він чи вона?
      </NavLink>
    </nav>
  );
};
