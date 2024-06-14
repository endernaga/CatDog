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
      <BreadCrumb title1="Знайти друга" title2={name} />
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
            <div className="icon icon-right"></div>
          </div>
        </div>
        <div className="personal__right">
          <div className="personal__top">
            <h1 className="personal__name">{name}</h1>
            <div className="personal__icons">
              <div className="icon icon-share"></div>
              <div className="icon icon-heart"></div>
            </div>
          </div>
          <div className="personal__params">
            <div className="personal__param">
              <div className={classNames('personal__icon', {
                'personal__icon-women': sex === 'Дівчинка',
                'personal__icon-men': sex === 'Хлопчик',
              })}></div>
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
            text="Стати другом"
          />
        </div>
      </div>

      <div className="personal__adopt">
        <div className="personal__adopt__left">
          <h3 className="personal__adopt__text">Будь відповідальним власником!</h3>
          <LargeButton leftIcon={false} rightIcon={true} text="Правила адапції" to='/adopts' />
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

      <BigSectionsHeader text={['Шукають','Родину']} />
    </div>
  );
};
