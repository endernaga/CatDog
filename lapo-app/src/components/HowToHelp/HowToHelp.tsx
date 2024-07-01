import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/fetchProducts";
import { BigButton, MediumButton } from "../Buttons";
import { SectionsHeader } from "../SectionsHeader";
import "./HowToHelp.scss";
import classNames from "classnames";

type donateItem = {
  oneTimeLink: string,
  subscribe: string,
  sum: string,
}

export const HowToHelp = () => {
  const donate: donateItem[] = [
    {
      oneTimeLink: "https://buy.stripe.com/test_28oeX8228gGwbte4gg",
      subscribe: "https://buy.stripe.com/test_cN25myayE8a054Q28e",
      sum: "50 UAH",
    },
    {
      oneTimeLink: "https://buy.stripe.com/test_bIY5mycGM9e4apa3cd",
      subscribe: "https://buy.stripe.com/test_8wM6qC8qwdukdBmdQX",
      sum: "100 UAH",
    },
    {
      oneTimeLink: "https://buy.stripe.com/test_28odT49uA0Hy2WI146",
      subscribe: "https://buy.stripe.com/test_8wM02eayE9e4btedQY",
      sum: "200 UAH",
    },
    {
      oneTimeLink: "https://buy.stripe.com/test_14k3eqgX2fCsgNyaEH",
      subscribe: "https://buy.stripe.com/test_8wM16ifSY2PG54QdQZ",
      sum: "500 UAH",
    },
    {
      oneTimeLink: "https://buy.stripe.com/test_aEUcP00Y40HybtedQU",
      subscribe: "https://buy.stripe.com/test_dR6cP05ekai8eFq00a",
      sum: "1000 UAH",
    },
    {
      oneTimeLink: "https://buy.stripe.com/test_28oeX8bCI4XO1SE149",
      subscribe: "",
      sum: "Інша сума",
    },
  ];

  const [paymentType, setPaymentType] = useState<string>("once");
  const [selectSum, setSelectSum] = useState<string>('');
  const [urlForButton, setUrlForButton] = useState<string>('');
  const handleItemSelect = (option: donateItem) => {
    setSelectSum(option.sum);
    if (paymentType === 'once') {
      setUrlForButton(option.oneTimeLink);
    } else {
      setUrlForButton(option.subscribe);
    }
  }

  useEffect(() => {
    setSelectSum('');
  }, [paymentType])

  return (
    <div id="donate" className="help">
      <SectionsHeader text="Як ще можна допомогти?" />
      <div className="help__content">
        <div className="help__left">
          <img className="help__meme-cat" src={`${BASE_URL}/img/memeCat.png`} />
          <div className="help__meme-text" />
        </div>

        <div className="help__right">
          <div className="help__buttons">
            <button
              className={classNames("help__buttons__select", {
                "help__buttons__select--active": paymentType === "once",
              })}
              onClick={() => setPaymentType('once')}
            >
              Разова допомога
            </button>
            <button
              className={classNames("help__buttons__select", {
                "help__buttons__select--active": paymentType === "subscribe",
              })}
              onClick={() => setPaymentType('subscribe')}
            >
              Щомісячна допомога
            </button>
          </div>

          <div className="help__main">
            <p className="help__main__text">Обери суму разового внеску</p>

            <div className="help__main__select">
              <div className="help__main__options">
                {donate.map((option) => (
                  <div
                    className={classNames("help__main__sum", {
                      "help__main__sum--active": selectSum === option.sum,
                      "help__main__sum--disabled": option.sum === 'Інша сума' && paymentType === 'subscribe',
                    })}
                    onClick={() => handleItemSelect(option)}
                  >{option.sum}</div>
                ))}
              </div>
              <BigButton
                to={urlForButton}
                target="_blank"
                leftIcon={false}
                rightIcon={true}
                text="Продовжити"
                width="614"
              />
            </div>
          </div>
          <p className="help__footer">Подаруй підтримку в два кліки!</p>
        </div>
      </div>
    </div>
  );
};
