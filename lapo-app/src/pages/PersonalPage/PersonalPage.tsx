import classNames from "classnames";
import { BreadCrumb } from "../../components/BreadCrumb";
import { LargeButton } from "../../components/Buttons";
import { catData } from "../../utils/catData";
import { BASE_URL } from "../../utils/fetchProducts";
import "./PersonalPage.scss";
import { BigSectionsHeader } from "../../components/BigSectionsHeader";

export const PersonalPage = () => {
  const {
    name,
    sex,
    age,
    sterilized,
    vaccinated,
    temper,
    behavior,
    about,
    specifics,
    images,
  } = catData[0];
  return (
    <div className="personal">
      <BreadCrumb />
      <div className="personal__content">
        <div className="personal__left">
          <img
            src={`${BASE_URL}/${images[0]}`}
            alt="main-photo"
            className="personal__photo personal__photo-main"
          />
          <div className="personal__slider">
            <div className="icon icon-left" />
            <div className="personal__slider__content">
              {images.map((image) => (
                <img
                  src={`${BASE_URL}/${image}`}
                  alt="small-photo"
                  className="personal__photo personal__photo-small"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="personal__right">
          <div className="personal__top">
            <h1 className="personal__name">{name}</h1>
            <div className="personal__icons">
              <div className="icon icon-share"></div>
              <div className="personal__like">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.001 4.529C13.1436 3.5062 14.6345 2.95987 16.1674 3.00228C17.7003 3.04468 19.1587 3.6726 20.243 4.757C21.3264 5.84019 21.9543 7.29675 21.9982 8.82809C22.0421 10.3594 21.4986 11.8496 20.479 12.993L11.999 21.485L3.52102 12.993C2.50028 11.849 1.95623 10.3576 2.00056 8.82499C2.04489 7.29241 2.67425 5.83495 3.75942 4.75183C4.84459 3.66871 6.30323 3.04211 7.83589 3.00067C9.36854 2.95923 10.8589 3.5061 12.001 4.529ZM18.827 6.17C18.1046 5.44813 17.1333 5.03008 16.1125 5.00163C15.0916 4.97318 14.0985 5.33648 13.337 6.017L12.002 7.215L10.666 6.018C9.90769 5.33989 8.91949 4.9762 7.90249 5.00092C6.88549 5.02565 5.91612 5.43694 5.19164 6.1511C4.46716 6.86526 4.04201 7.82862 4.0027 8.84516C3.96338 9.8617 4.31286 10.855 4.98002 11.623L12 18.654L19.02 11.624C19.6844 10.8594 20.0339 9.87124 19.9981 8.85898C19.9623 7.84671 19.5438 6.88572 18.827 6.17Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            </div>
          </div>
          <div className="personal__params">
            <div className="personal__param">
              <div
                className={classNames("personal__icon", {
                  "personal__icon-women": sex === "Дівчинка",
                  "personal__icon-men": sex === "Хлопчик",
                })}
              ></div>
              <p className="personal__param__text">{sex}</p>
            </div>
            <div className="personal__param">
              <div className="personal__icon personal__icon-age"></div>
              <p className="personal__param__text">{age}</p>
            </div>
            <div className="personal__param">
              <div className="personal__icon personal__icon-vaccinated"></div>
              <p className="personal__param__text">{vaccinated}</p>
            </div>
            <div className="personal__param">
              <div className="personal__icon personal__icon-sterilized"></div>
              <p className="personal__param__text">{sterilized}</p>
            </div>
            <div className="personal__param">
              <div className="personal__icon personal__icon-temper"></div>
              <p className="personal__param__text">{temper}</p>
            </div>
            <div className="personal__param">
              <div className="personal__icon personal__icon-behavior"></div>
              <p className="personal__param__text">{behavior}</p>
            </div>
          </div>

          <div className="personal__about">
            <h4 className="personal__title">Про мене:</h4>
            <div className="personal__text">{about}</div>
          </div>

          <div className="personal__about">
            <h4 className="personal__title">Особливості:</h4>
            <div className="personal__text">{specifics}</div>
          </div>

          <LargeButton
            to="/adopt"
            leftIcon={false}
            rightIcon={true}
            text="Забрати в сім'ю"
          />
        </div>
      </div>

      <div className="personal__adopt">
        <div className="personal__adopt__left">
          <h3 className="personal__adopt__text">
            Будь ласка, зверни свою увагу!
          </h3>
          <LargeButton
            leftIcon={false}
            rightIcon={true}
            text="Правила адапції"
            to="/adopts"
          />
        </div>
        <div className="personal__adopt__pets">
          <img
            src={`${BASE_URL}/img/adoptPromo/dog.svg`}
            alt="dog-adopt-promo"
            className="personal__adopt__dog"
          />
          <img
            src={`${BASE_URL}/img/adoptPromo/cat.svg`}
            alt="cat-adopt-promo"
            className="personal__adopt__cat"
          />
        </div>
      </div>

      <BigSectionsHeader text={["Шукають", "Родину"]} />
    </div>
  );
};
