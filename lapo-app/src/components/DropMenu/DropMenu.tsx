import { useContext, useEffect } from "react";
import "./DropMenu.scss";
import { GlobalContext } from "../../context/GlobalContext";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../utils/fetchProducts";

export const DropMenu = () => {
  const dropdownContent = [
    {
      name: "Про притулок",
      to: "/about",
      img: "img/dropdown/about.jpg",
    },
    {
      name: "Щасливі історії",
      to: "/happyStories",
      img: "img/dropdown/happyStories.jpg",
    },
    {
      name: "Звіти",
      to: "/reports",
      img: "img/dropdown/reports.jpg",
    },
    {
      name: "Правила адапції",
      to: "/adopts",
      img: "img/dropdown/rules.jpg",
    },
  ];

  const { isDropmenuOpen, setIsDropmenuOpen } = useContext(GlobalContext);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      !(event.target as HTMLElement).closest('.navbar__about') &&
      !(event.target as HTMLElement).closest('.dropmenu')
    ) {
      setIsDropmenuOpen(false);
    }
  };

  useEffect(() => {
    if (isDropmenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropmenuOpen]);

  const style = isDropmenuOpen ? "dropmenu-open" : "dropmenu";

  return (
    <>
      {isDropmenuOpen && <div className="overlay" />}
      <div className={style}>
        {dropdownContent.map((item, index) => (
          <NavLink
            to={item.to}
            key={index}
            className="dropmenu__item"
            onClick={() => setIsDropmenuOpen(false)}
          >
            <p className="dropmenu__text">{item.name}</p>
            <img
              src={`${BASE_URL}/${item.img}`}
              className="dropmenu__img"
              alt={item.name}
            />
          </NavLink>
        ))}
      </div>
    </>
  );
};
