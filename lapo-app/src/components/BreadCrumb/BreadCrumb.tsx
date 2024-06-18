import { Link, useLocation } from "react-router-dom";
import "./BreadCrumb.scss";

export const links = {
  pets: "Знайти друга",
  dogs: "Песики",
  cats: "Котики",
  about: 'Про притулок',
  contacts: 'Контакти',
};

export const returnName = (obj: Record<string, any>, key: string) => {
  return obj[key];
}

export const BreadCrumb = () => {

  const { pathname } = useLocation();
  const pathFull = pathname.split("/");
  const path = pathFull.slice(1);

  function getRowLink(index: number) {
    const result = [];

    for (let i = 0; i <= index; i += 1) {
      result.push(pathFull[i]);
    }

    return result.join("/");
  }

  return (
    <div className="breadcrumb">
      <Link to="/" className="icon icon-home" />

      {path.map((p, i) => (
        <>
          <div className="icon icon-right" />
          <Link to={getRowLink(i + 1)} className="breadcrumb__title">
            {returnName(links, p.split('-').join(' '))}
          </Link>
        </>
      ))}
    </div>
  );
};
