import classNames from "classnames";
import { BreadCrumb } from "../../components/BreadCrumb";
import { LargeButton } from "../../components/Buttons";
import { catData } from "../../utils/catData";
import { BASE_URL } from "../../utils/fetchProducts";
import "./PersonalPage.scss";
import { BigSectionsHeader } from "../../components/BigSectionsHeader";
import { useState } from "react";
import { ShareModal } from "../../components/ShareModal";

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
    size,
  } = catData[0];

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [mainPhoto, setMainPhoto] = useState<string>(images[0]);

  const [currentImage, setCurrentImage] = useState(1);
  const photoWidth = 106;
  const gap = 16;
  const visibleImages = 3;
  const transformValue = (currentImage - 1) * (photoWidth + gap);

  const rightSlide = () => {
    if (currentImage >= images.length - visibleImages + 1) {
      setCurrentImage(1);

      return;
    }
    setCurrentImage(currentImage + 1);
  };

  const leftSlide = () => {
    if (currentImage === 1) {
      setCurrentImage(images.length - visibleImages + 1);
      return;
    }
    setCurrentImage(currentImage - 1);
  };

  return (
    <div className="personal">
      {isShareModalOpen && <ShareModal
        closeModal={() => setIsShareModalOpen(false)}
        pet={catData[0]}
      />}
      <BreadCrumb petName={name} />
      <div className="personal__content">
        <div className="personal__left">
          <img
            src={`${BASE_URL}/${mainPhoto}`}
            alt="main-photo"
            className="personal__photo personal__photo-main"
          />
          <div className="personal__slider">
            <div className="personal__slider__button" onClick={leftSlide}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4373 16L21.0373 22.6L19.152 24.4866L10.6667 16L19.152 7.51465L21.0373 9.39998L14.4373 16Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="personal__slider__container">
              <ul
                className="personal__slider__list"
                style={{ transform: `translateX(-${transformValue}px)` }}
              >
                {images.map((image, index) => (
                  <li key={index}>
                    <img
                      key={image}
                      src={`${BASE_URL}/${image}`}
                      alt={`${index} + 1`}
                      onClick={() => setMainPhoto(image)}
                      className="personal__photo personal__photo-small"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="personal__slider__button" onClick={rightSlide}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5626 16L10.9626 9.39999L12.848 7.51599L21.3333 16L12.848 24.4853L10.9626 22.5987L17.5626 16Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="personal__right">
          <div className="personal__top">
            <h1 className="personal__name">{name}</h1>
            <div className="personal__icons">
              <div
                className="personal__share"
                onClick={() => setIsShareModalOpen(true)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.1202 17.023L8.92121 14.733C8.373 15.3191 7.66119 15.7267 6.87828 15.9029C6.09537 16.0791 5.27756 16.0158 4.53113 15.7211C3.7847 15.4264 3.14417 14.914 2.69277 14.2505C2.24138 13.587 2 12.803 2 12.0005C2 11.198 2.24138 10.4141 2.69277 9.75058C3.14417 9.08707 3.7847 8.57467 4.53113 8.27998C5.27756 7.98529 6.09537 7.92193 6.87828 8.09814C7.66119 8.27434 8.373 8.68196 8.92121 9.26802L13.1212 6.97802C12.8831 6.03399 12.9975 5.03552 13.4429 4.16979C13.8884 3.30406 14.6342 2.63051 15.5408 2.27539C16.4473 1.92027 17.4522 1.90797 18.3671 2.2408C19.2821 2.57362 20.0442 3.22872 20.5107 4.08329C20.9772 4.93786 21.116 5.93322 20.9011 6.8828C20.6862 7.83238 20.1323 8.67098 19.3433 9.2414C18.5543 9.81181 17.5843 10.0749 16.6152 9.98129C15.6462 9.8877 14.7445 9.44388 14.0792 8.73302L9.87921 11.023C10.0404 11.6644 10.0404 12.3357 9.87921 12.977L14.0792 15.267C14.7448 14.5565 15.6467 14.1131 16.6158 14.02C17.5849 13.9269 18.5547 14.1904 19.3434 14.7612C20.1322 15.332 20.6856 16.1708 20.9001 17.1205C21.1146 18.0701 20.9754 19.0654 20.5085 19.9198C20.0417 20.7741 19.2793 21.4289 18.3642 21.7613C17.4491 22.0937 16.4442 22.081 15.5379 21.7255C14.6315 21.37 13.8859 20.6962 13.4408 19.8303C12.9958 18.9644 12.8818 17.9659 13.1202 17.022M6.00021 14C6.53064 14 7.03935 13.7893 7.41442 13.4142C7.78949 13.0392 8.00021 12.5305 8.00021 12C8.00021 11.4696 7.78949 10.9609 7.41442 10.5858C7.03935 10.2107 6.53064 10 6.00021 10C5.46977 10 4.96107 10.2107 4.58599 10.5858C4.21092 10.9609 4.00021 11.4696 4.00021 12C4.00021 12.5305 4.21092 13.0392 4.58599 13.4142C4.96107 13.7893 5.46977 14 6.00021 14ZM17.0002 8.00002C17.5306 8.00002 18.0393 7.78931 18.4144 7.41424C18.7895 7.03916 19.0002 6.53046 19.0002 6.00002C19.0002 5.46959 18.7895 4.96088 18.4144 4.58581C18.0393 4.21074 17.5306 4.00002 17.0002 4.00002C16.4698 4.00002 15.9611 4.21074 15.586 4.58581C15.2109 4.96088 15.0002 5.46959 15.0002 6.00002C15.0002 6.53046 15.2109 7.03916 15.586 7.41424C15.9611 7.78931 16.4698 8.00002 17.0002 8.00002ZM17.0002 20C17.5306 20 18.0393 19.7893 18.4144 19.4142C18.7895 19.0392 19.0002 18.5305 19.0002 18C19.0002 17.4696 18.7895 16.9609 18.4144 16.5858C18.0393 16.2107 17.5306 16 17.0002 16C16.4698 16 15.9611 16.2107 15.586 16.5858C15.2109 16.9609 15.0002 17.4696 15.0002 18C15.0002 18.5305 15.2109 19.0392 15.586 19.4142C15.9611 19.7893 16.4698 20 17.0002 20Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
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
