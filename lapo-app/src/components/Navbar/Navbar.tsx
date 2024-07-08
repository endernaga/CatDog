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

  const { isDropmenuOpen, setIsDropmenuOpen } = useContext(GlobalContext);

  const toggleDropdown = () => {
    setIsDropmenuOpen(!isDropmenuOpen);
  };

  return (
    <nav className="navbar">
      <div
        className={classNames("navbar__about", {
          "navbar__about--active": isDropmenuOpen,
        })}
        onClick={toggleDropdown}
      >
        <p
          className="navbar__about__text"
        >
          Про нас
        </p>
        <svg
          width="24"
          className="navbar__about__icon"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 13.171L16.95 8.22101L18.364 9.63601L12 16L5.63599 9.63601L7.04999 8.22201L12 13.171Z"
            fill="currentColor"
          />
        </svg>
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
