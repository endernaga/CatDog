import React, { useState } from "react";
import "./SosForm.scss";
import { MediumButton } from "../Buttons";

type Props = {
  handleCloseForm: () => void;
};

export const SosForm: React.FC<Props> = ({ handleCloseForm }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");

  const handleFocusForInput = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target
      .closest(".form__content__item")!
      .classList.add("form__content__item--focus");
  };

  const handleBlurForInput = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target
      .closest(".form__content__item")!
      .classList.remove("form__content__item--focus");
  };

  const handleFocusForTextarea= (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target
      .closest(".form__content__big-item")!
      .classList.add("form__content__big-item--focus");
  };
  const handleBlurForTextarea = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target
      .closest(".form__content__big-item")!
      .classList.remove("form__content__big-item--focus");
  };

  return (
    <>
      <div className="overlay" />
      <div className="form">
        <div className="form__header">
          <div className="form__title">SOS! Тваринка у біді!</div>
          <div
            className="icon icon-close icon-close-form"
            onClick={handleCloseForm}
          />
        </div>

        <div className="form__content">
          <div className="form__content__top">
            <div className="form__content__item">
              <label className="form__text">Ваше ім'я</label>
              <input
                type="text"
                value={name}
                className="form__content__input"
                onFocus={handleFocusForInput}
                onBlur={handleBlurForInput}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form__content__item">
              <label className="form__text">Ваш номер телефону</label>
              <div className="form__content__input">
                <span className="form__content__input__prefix"> +38 </span>
              <input
                type="tel"
                className="form__input-phone"
                value={phone}
                  placeholder="(000) 000-00-00"
                  onFocus={handleFocusForInput}
                onBlur={handleBlurForInput}
                onChange={(e) => setPhone(e.target.value)}
                />
                </div>
            </div>
          </div>

          <div className="form__content__big-item">
            <label className="form__text">Ваше звернення</label>
            <textarea
              value={text}
              placeholder=" Опишіть ситуацію"
              onFocus={handleFocusForTextarea}
              onBlur={handleBlurForTextarea}
              className="form__content__textarea"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>

        <MediumButton
          leftIcon={false}
          rightIcon={true}
          text="Відправити"
          to="sentForm"
        />
      </div>
    </>
  );
};
