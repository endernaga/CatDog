import { useEffect, useState } from "react";
import { BreadCrumb } from "../../components/BreadCrumb";
import { LargeButton } from "../../components/Buttons";
import { BASE_URL } from "../../utils/fetchProducts";
import "./GamePage.scss";
import { pet1, pet2 } from "../../utils/JUSTFORDEVELOP/petsForGame";
import classNames from "classnames";

export const GamePage = () => {
  const [isStartPageVisible, setIsStartPageVisible] = useState(true);
  const [isRound, setIsRound] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const firstPet = pet1;
  const secondPet = pet2;
  const pets = [firstPet, secondPet];
  const [firstItemChoice, setFirstItemChoice] = useState<string>("");
  const [secondItemChoice, setSecondItemChoice] = useState<string>("");
  const [isFirstTrue, setIsFirstTrue] = useState<boolean>(false);
  const [isSecondTrue, setIsSecondTrue] = useState<boolean>(false);

  const isSelect = (v: string, index: number) => {
    let select = false;
    if (index === 0) {
      select = v === firstItemChoice;
    } else {
      select = v === secondItemChoice;
    }

    return select;
  };

  const onSelect = (index: number, checked: boolean, value: string) => {
    if (checked === true) {
      if (index === 0) {
        setFirstItemChoice(value);
        console.log(firstItemChoice);
      } else {
        setSecondItemChoice(value);
      }
    } else {
      if (index === 0) {
        setFirstItemChoice("");
      } else {
        setSecondItemChoice("");
      }
    }
  };

  const firstItemCheck = () => {
    if (firstItemChoice === firstPet.sex) {
      setIsFirstTrue(true);
      document.getElementById("0")?.classList.add("game__cart--success");
    } else {
      document.getElementById("0")?.classList.add("game__cart--loss");
    }
  };

  const secondItemCheck = () => {
    if (secondItemChoice === secondPet.sex) {
      setIsSecondTrue(true);
      document.getElementById("1")?.classList.add("game__cart--success");
    } else {
      document.getElementById("1")?.classList.add("game__cart--loss");
    }
  };

  const startStyleReset = () => {
    document.querySelectorAll(".game__checkboxes").forEach((item) => {
      if (item instanceof HTMLElement) {
        item.style.display = "flex";
      }
    });

    document.querySelectorAll(".game__info").forEach((item) => {
      if (item instanceof HTMLElement) {
        item.style.display = "none";
      }
    });

    document.querySelectorAll(".game__button").forEach((item) => {
      if (item instanceof HTMLElement) {
        item.style.display = "none";
      }
    });

    document.querySelectorAll(".game__cart").forEach((cart) => {
      cart.className = "game__cart";
    });
  }

  useEffect(() => {
    if (!isRound) {
      firstItemCheck();
      secondItemCheck();
      document.querySelectorAll(".game__checkboxes").forEach((item) => {
        if (item instanceof HTMLElement) {
          item.style.display = "none";
        }
      });
      document.querySelectorAll(".game__info").forEach((item) => {
        if (item instanceof HTMLElement) {
          item.style.display = "flex";
        }
      });
      document.querySelectorAll(".game__button").forEach((item) => {
        if (item instanceof HTMLElement) {
          item.style.display = "block";
        }
      });
    }
  }, [isRound]);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function playRound() {
    setIsStartPageVisible(false);
    setIsRound(true);
    setFirstItemChoice("");
    setSecondItemChoice("");
    setIsFirstTrue(false);
    setIsSecondTrue(false);
    setSeconds(10);

    startStyleReset();

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    await delay(10000);

    clearInterval(interval);

    setIsRound(false);
  }

  return (
    <div className="game">
      <BreadCrumb />
      {isStartPageVisible && (
        <div className="game__start">
          <h3 className="game__start__title">Вгадаєш, де ВІН, а де ВОНА?</h3>
          <div className="game__start__photos">
            <img
              src={`${BASE_URL}/img/gamePromo/animal1.jpg`}
              alt="image1"
              className="game__start__img"
            />
            <img
              src={`${BASE_URL}/img/gamePromo/animal2.webp`}
              alt="image2"
              className="game__start__img"
            />
          </div>
          <LargeButton
            type="button"
            onClick={playRound}
            leftIcon={false}
            rightIcon={true}
            text="Розпочати гру"
          />
        </div>
      )}
      {!isStartPageVisible && (
        <div className="game__content">
          {!!isRound && (
            <div className="game__round">
              <h3 className="game__round__title">Залишилось секунд:</h3>
              <div className="game__round__seconds">{seconds}</div>
            </div>
          )}
          <div className="game__carts">
            {pets.map((pet, index) => (
              <div className="game__cart" id={index.toString()}>
                <div className={classNames("game__paws", {
                  "game__paws--round": isRound,
                })}>
                  <svg
                    className="game__paw"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1686 51.4133C20.6255 51.4347 21.1446 51.44 21.7259 51.4293C23.441 51.4007 25.149 51.2015 26.8246 50.8347C29.4343 50.2669 32.1218 50.1487 34.7713 50.4853C35.9339 50.6191 37.0835 50.8483 38.2086 51.1707C41.0806 51.904 45.1686 51.7653 46.2219 50.0773C46.9953 48.8293 46.8966 47.9787 46.1526 46.88C45.9926 46.64 45.8166 46.4267 45.6513 46.2533L45.5873 46.1867L45.1473 45.8347C44.6761 45.4524 44.1615 45.0204 43.6033 44.5387C41.9782 43.1362 40.4192 41.6591 38.9313 40.112C37.4018 38.5399 35.9959 36.8523 34.7259 35.064L34.6299 34.9227C32.6513 31.8853 30.4753 32.0773 29.2913 34.0747C28.5452 35.3291 27.6932 36.5174 26.7446 37.6267C25.6513 38.912 24.5313 40 23.2619 41.0853C22.9366 41.3653 21.9233 42.2053 22.1659 42.0027C22.1553 42.0107 22.1206 42.0427 22.2993 41.8133C22.0379 42.1333 19.7659 44.152 19.0993 44.912C17.7259 46.4667 17.1739 47.792 17.3793 48.8587C17.5739 49.8613 17.9659 50.424 18.5793 50.8453C18.9677 51.1071 19.4019 51.2935 19.8593 51.3947L20.1686 51.4133ZM39.0993 32.0107C42.7659 37.264 49.0486 42.1253 49.0486 42.1253C49.0486 42.1253 54.5526 46.7867 50.7499 52.8933C46.9473 59 36.7419 56.3013 36.7419 56.3013C36.7419 56.3013 32.6886 54.9947 27.9793 56.04C23.2726 57.0933 19.2166 56.6933 19.2166 56.6933C19.2166 56.6933 13.3339 56.04 12.1419 49.8693C10.9526 43.6987 17.6353 39.096 18.1633 38.4453C18.6859 37.7867 22.1953 35.584 24.7019 31.3573C27.2086 27.128 34.2593 24.584 39.0993 32.0107ZM53.8673 28.224C53.8673 29.4427 54.3766 34.6053 49.7286 34.7093C45.0806 34.8107 44.8859 31.568 44.8859 29.2427C44.8859 26.808 45.3846 23.3627 49.1259 23.3627C52.8593 23.3627 53.8673 27.0133 53.8673 28.2267M39.3899 20.8213C36.2433 20.416 35.5313 17.5627 35.8353 14.7067C36.0886 12.3733 38.8806 8.78933 41.1179 9.304C43.3499 9.81067 45.3846 12.7707 44.9739 15.3147C44.5686 17.8667 42.5419 21.2293 39.3899 20.8213ZM26.0139 19.84C23.7179 19.84 21.8539 17.192 21.8539 13.92C21.8539 10.648 23.7126 8 26.0113 8C28.3099 8 30.1713 10.648 30.1713 13.92C30.1713 17.192 28.3126 19.84 26.0113 19.84M15.8966 32.016C11.3766 32.9893 9.69125 27.7573 10.1899 25.3093C10.1899 25.3093 10.7233 20.0107 14.3926 19.6827C17.3073 19.4293 19.4539 22.6187 19.6726 24.4427C19.8113 25.6267 20.4273 31.0427 15.8966 32.016Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="game__paw"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1686 51.4133C20.6255 51.4347 21.1446 51.44 21.7259 51.4293C23.441 51.4007 25.149 51.2015 26.8246 50.8347C29.4343 50.2669 32.1218 50.1487 34.7713 50.4853C35.9339 50.6191 37.0835 50.8483 38.2086 51.1707C41.0806 51.904 45.1686 51.7653 46.2219 50.0773C46.9953 48.8293 46.8966 47.9787 46.1526 46.88C45.9926 46.64 45.8166 46.4267 45.6513 46.2533L45.5873 46.1867L45.1473 45.8347C44.6761 45.4524 44.1615 45.0204 43.6033 44.5387C41.9782 43.1362 40.4192 41.6591 38.9313 40.112C37.4018 38.5399 35.9959 36.8523 34.7259 35.064L34.6299 34.9227C32.6513 31.8853 30.4753 32.0773 29.2913 34.0747C28.5452 35.3291 27.6932 36.5174 26.7446 37.6267C25.6513 38.912 24.5313 40 23.2619 41.0853C22.9366 41.3653 21.9233 42.2053 22.1659 42.0027C22.1553 42.0107 22.1206 42.0427 22.2993 41.8133C22.0379 42.1333 19.7659 44.152 19.0993 44.912C17.7259 46.4667 17.1739 47.792 17.3793 48.8587C17.5739 49.8613 17.9659 50.424 18.5793 50.8453C18.9677 51.1071 19.4019 51.2935 19.8593 51.3947L20.1686 51.4133ZM39.0993 32.0107C42.7659 37.264 49.0486 42.1253 49.0486 42.1253C49.0486 42.1253 54.5526 46.7867 50.7499 52.8933C46.9473 59 36.7419 56.3013 36.7419 56.3013C36.7419 56.3013 32.6886 54.9947 27.9793 56.04C23.2726 57.0933 19.2166 56.6933 19.2166 56.6933C19.2166 56.6933 13.3339 56.04 12.1419 49.8693C10.9526 43.6987 17.6353 39.096 18.1633 38.4453C18.6859 37.7867 22.1953 35.584 24.7019 31.3573C27.2086 27.128 34.2593 24.584 39.0993 32.0107ZM53.8673 28.224C53.8673 29.4427 54.3766 34.6053 49.7286 34.7093C45.0806 34.8107 44.8859 31.568 44.8859 29.2427C44.8859 26.808 45.3846 23.3627 49.1259 23.3627C52.8593 23.3627 53.8673 27.0133 53.8673 28.2267M39.3899 20.8213C36.2433 20.416 35.5313 17.5627 35.8353 14.7067C36.0886 12.3733 38.8806 8.78933 41.1179 9.304C43.3499 9.81067 45.3846 12.7707 44.9739 15.3147C44.5686 17.8667 42.5419 21.2293 39.3899 20.8213ZM26.0139 19.84C23.7179 19.84 21.8539 17.192 21.8539 13.92C21.8539 10.648 23.7126 8 26.0113 8C28.3099 8 30.1713 10.648 30.1713 13.92C30.1713 17.192 28.3126 19.84 26.0113 19.84M15.8966 32.016C11.3766 32.9893 9.69125 27.7573 10.1899 25.3093C10.1899 25.3093 10.7233 20.0107 14.3926 19.6827C17.3073 19.4293 19.4539 22.6187 19.6726 24.4427C19.8113 25.6267 20.4273 31.0427 15.8966 32.016Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <img
                  src={`${BASE_URL}/${pet.images[0]}`}
                  alt={pet.id}
                  className="game__photo"
                />
                <div className="game__checkboxes">
                  <label className="game__checkbox" key="Хлопчик">
                    <input
                      type="checkbox"
                      id="filterCheckbox"
                      value="Хлопчик"
                      checked={isSelect("Хлопчик", index)}
                      onChange={(e) =>
                        onSelect(index, e.target.checked, "Хлопчик")
                      }
                    />
                    <span className="game__checkmark" />
                    Він
                  </label>
                  <label className="game__checkbox" key="Дівчинка">
                    <input
                      type="checkbox"
                      id="filterCheckbox"
                      value="Дівчинка"
                      checked={isSelect("Дівчинка", index)}
                      onChange={(e) =>
                        onSelect(index, e.target.checked, "Дівчинка")
                      }
                    />
                    <span className="game__checkmark"></span>
                    Вона
                  </label>
                </div>
                <div className="game__info">
                  <div className="game__info__top">
                    {`${pet.name}, ${pet.sex}`}
                    <div className="game__info__result" />
                  </div>
                  <LargeButton
                    leftIcon={false}
                    rightIcon={true}
                    text="Познайомитися"
                    width="268"
                    to={`/pets/${pet.category}/${pet.id}`}
                  />
                </div>
                <div className={classNames("game__paws", {
                  "game__paws--round": isRound,
                })}>
                  <svg
                    className="game__paw"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1686 51.4133C20.6255 51.4347 21.1446 51.44 21.7259 51.4293C23.441 51.4007 25.149 51.2015 26.8246 50.8347C29.4343 50.2669 32.1218 50.1487 34.7713 50.4853C35.9339 50.6191 37.0835 50.8483 38.2086 51.1707C41.0806 51.904 45.1686 51.7653 46.2219 50.0773C46.9953 48.8293 46.8966 47.9787 46.1526 46.88C45.9926 46.64 45.8166 46.4267 45.6513 46.2533L45.5873 46.1867L45.1473 45.8347C44.6761 45.4524 44.1615 45.0204 43.6033 44.5387C41.9782 43.1362 40.4192 41.6591 38.9313 40.112C37.4018 38.5399 35.9959 36.8523 34.7259 35.064L34.6299 34.9227C32.6513 31.8853 30.4753 32.0773 29.2913 34.0747C28.5452 35.3291 27.6932 36.5174 26.7446 37.6267C25.6513 38.912 24.5313 40 23.2619 41.0853C22.9366 41.3653 21.9233 42.2053 22.1659 42.0027C22.1553 42.0107 22.1206 42.0427 22.2993 41.8133C22.0379 42.1333 19.7659 44.152 19.0993 44.912C17.7259 46.4667 17.1739 47.792 17.3793 48.8587C17.5739 49.8613 17.9659 50.424 18.5793 50.8453C18.9677 51.1071 19.4019 51.2935 19.8593 51.3947L20.1686 51.4133ZM39.0993 32.0107C42.7659 37.264 49.0486 42.1253 49.0486 42.1253C49.0486 42.1253 54.5526 46.7867 50.7499 52.8933C46.9473 59 36.7419 56.3013 36.7419 56.3013C36.7419 56.3013 32.6886 54.9947 27.9793 56.04C23.2726 57.0933 19.2166 56.6933 19.2166 56.6933C19.2166 56.6933 13.3339 56.04 12.1419 49.8693C10.9526 43.6987 17.6353 39.096 18.1633 38.4453C18.6859 37.7867 22.1953 35.584 24.7019 31.3573C27.2086 27.128 34.2593 24.584 39.0993 32.0107ZM53.8673 28.224C53.8673 29.4427 54.3766 34.6053 49.7286 34.7093C45.0806 34.8107 44.8859 31.568 44.8859 29.2427C44.8859 26.808 45.3846 23.3627 49.1259 23.3627C52.8593 23.3627 53.8673 27.0133 53.8673 28.2267M39.3899 20.8213C36.2433 20.416 35.5313 17.5627 35.8353 14.7067C36.0886 12.3733 38.8806 8.78933 41.1179 9.304C43.3499 9.81067 45.3846 12.7707 44.9739 15.3147C44.5686 17.8667 42.5419 21.2293 39.3899 20.8213ZM26.0139 19.84C23.7179 19.84 21.8539 17.192 21.8539 13.92C21.8539 10.648 23.7126 8 26.0113 8C28.3099 8 30.1713 10.648 30.1713 13.92C30.1713 17.192 28.3126 19.84 26.0113 19.84M15.8966 32.016C11.3766 32.9893 9.69125 27.7573 10.1899 25.3093C10.1899 25.3093 10.7233 20.0107 14.3926 19.6827C17.3073 19.4293 19.4539 22.6187 19.6726 24.4427C19.8113 25.6267 20.4273 31.0427 15.8966 32.016Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="game__paw"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1686 51.4133C20.6255 51.4347 21.1446 51.44 21.7259 51.4293C23.441 51.4007 25.149 51.2015 26.8246 50.8347C29.4343 50.2669 32.1218 50.1487 34.7713 50.4853C35.9339 50.6191 37.0835 50.8483 38.2086 51.1707C41.0806 51.904 45.1686 51.7653 46.2219 50.0773C46.9953 48.8293 46.8966 47.9787 46.1526 46.88C45.9926 46.64 45.8166 46.4267 45.6513 46.2533L45.5873 46.1867L45.1473 45.8347C44.6761 45.4524 44.1615 45.0204 43.6033 44.5387C41.9782 43.1362 40.4192 41.6591 38.9313 40.112C37.4018 38.5399 35.9959 36.8523 34.7259 35.064L34.6299 34.9227C32.6513 31.8853 30.4753 32.0773 29.2913 34.0747C28.5452 35.3291 27.6932 36.5174 26.7446 37.6267C25.6513 38.912 24.5313 40 23.2619 41.0853C22.9366 41.3653 21.9233 42.2053 22.1659 42.0027C22.1553 42.0107 22.1206 42.0427 22.2993 41.8133C22.0379 42.1333 19.7659 44.152 19.0993 44.912C17.7259 46.4667 17.1739 47.792 17.3793 48.8587C17.5739 49.8613 17.9659 50.424 18.5793 50.8453C18.9677 51.1071 19.4019 51.2935 19.8593 51.3947L20.1686 51.4133ZM39.0993 32.0107C42.7659 37.264 49.0486 42.1253 49.0486 42.1253C49.0486 42.1253 54.5526 46.7867 50.7499 52.8933C46.9473 59 36.7419 56.3013 36.7419 56.3013C36.7419 56.3013 32.6886 54.9947 27.9793 56.04C23.2726 57.0933 19.2166 56.6933 19.2166 56.6933C19.2166 56.6933 13.3339 56.04 12.1419 49.8693C10.9526 43.6987 17.6353 39.096 18.1633 38.4453C18.6859 37.7867 22.1953 35.584 24.7019 31.3573C27.2086 27.128 34.2593 24.584 39.0993 32.0107ZM53.8673 28.224C53.8673 29.4427 54.3766 34.6053 49.7286 34.7093C45.0806 34.8107 44.8859 31.568 44.8859 29.2427C44.8859 26.808 45.3846 23.3627 49.1259 23.3627C52.8593 23.3627 53.8673 27.0133 53.8673 28.2267M39.3899 20.8213C36.2433 20.416 35.5313 17.5627 35.8353 14.7067C36.0886 12.3733 38.8806 8.78933 41.1179 9.304C43.3499 9.81067 45.3846 12.7707 44.9739 15.3147C44.5686 17.8667 42.5419 21.2293 39.3899 20.8213ZM26.0139 19.84C23.7179 19.84 21.8539 17.192 21.8539 13.92C21.8539 10.648 23.7126 8 26.0113 8C28.3099 8 30.1713 10.648 30.1713 13.92C30.1713 17.192 28.3126 19.84 26.0113 19.84M15.8966 32.016C11.3766 32.9893 9.69125 27.7573 10.1899 25.3093C10.1899 25.3093 10.7233 20.0107 14.3926 19.6827C17.3073 19.4293 19.4539 22.6187 19.6726 24.4427C19.8113 25.6267 20.4273 31.0427 15.8966 32.016Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className="game__button">
            <LargeButton
              type="button"
              onClick={playRound}
              leftIcon={false}
              rightIcon={true}
              text="Грати знову"
            />
          </div>
        </div>
      )}
    </div>
  );
};
