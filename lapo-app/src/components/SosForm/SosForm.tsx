import React, { useState } from "react";
import "./SosForm.scss";
import { MediumButton } from "../Buttons";
import classNames from "classnames";

type Props = {
  handleCloseForm: () => void;
};

export const SosForm: React.FC<Props> = ({ handleCloseForm }) => {
  const defaultState = { value: "", hasError: false };
  const [name, setName] = useState(defaultState);
  const [phone, setPhone] = useState(defaultState);
  const [text, setText] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);

  const handleFocusForInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const input =
      e.target.closest(`input[type="text"]`) ||
      e.target.closest(".form__content__input");

    const formItem = input?.closest(".form__content__item");
    //input?.classList.add("form__content__input--focus");
    console.log(input);
    const icon = formItem?.querySelector(".form__icon");
    icon?.classList.remove("form__icon--success", "form__icon--danger");
  };

  const handleBlurForInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const input =
      e.target.closest(`input[type="text"]`) ||
      e.target.closest(".form__content__input");
    const formItem = input?.closest(".form__content__item");
    const icon = formItem?.querySelector(".form__icon");
    //input?.classList.remove("form__content__input--focus");

    if (input?.getAttribute("data-custom") === "name") {
      if (e.target.value.trim().length > 2) {
        input?.classList.add("form__content__input--success");
        icon?.classList.add("form__icon--success");
      } else {
        input?.classList.remove("form__content__input--success");
      }
    } else {
      if (e.target.value.trim().length === 10) {
        input?.classList.add("form__content__input--success");
        icon?.classList.add("form__icon--success");
      } else {
        input?.classList.remove("form__content__input--success");
      }
    }
  };
  const handleFocusForTextarea = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const textarea = e.target.closest(".form__content__textarea");
    const formItem = textarea?.closest(".form__content__big-item");
    //formItem?.classList.add("form__content__big-item--focus");

    const icon = formItem?.querySelector(".form__icon");
    icon?.classList.remove("form__icon--success", "form__icon--danger");
  };

  const handleBlurForTextarea = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const textarea = e.target.closest(".form__content__textarea");
    const formItem = textarea?.closest(".form__content__big-item");
    //formItem?.classList.remove("form__content__big-item--focus");
    const icon = formItem?.querySelector(".form__icon");
    console.log(e.target.value.trim().length);

    if (e.target.value.trim().length >= 5) {
      textarea?.classList.add("form__content__textarea--success");
      icon?.classList.add("form__icon--success");
    } else {
      textarea?.classList.remove("form__content__textarea--success");
    }
  };

  const reset = () => {
    setName((prevName) => ({ ...prevName, value: "" }));
    setPhone((prevName) => ({ ...prevName, value: "" }));
    setText((prevName) => ({ ...prevName, value: "" }));
  };

  const handleClearForm = () => {
    setName({ value: "", hasError: false });
    setPhone({ value: "", hasError: false });
    setText({ value: "", hasError: false });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (name.value.trim().length <= 2) {
      setName((prevName) => ({ ...prevName, hasError: true }));
    }

    if (text.value.trim().length < 5) {
      setText((prevText) => ({ ...prevText, hasError: true }));
    }

    if (phone.value.length !== 10) {
      setPhone((prevPhone) => ({ ...prevPhone, hasError: true }));
    }

    if (
      name.value.trim() === "" ||
      text.value.trim() === "" ||
      phone.value.length < 10
    ) {
      setIsLoading(false);
      return;
    }

    const newMessage = {
      name: name.value.trim(),
      phone: `+38${phone.value.trim()}`,
      text: text.value.trim(),
    };
  };

  return (
    <>
      <div className="overlay" />
      <form className="form" onSubmit={handleSubmit}>
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
                data-custom="name"
                value={name.value}
                className={classNames("form__content__input", {
                  "form__content__input--danger": name.hasError,
                })}
                placeholder="Ім'я"
                onFocus={handleFocusForInput}
                onBlur={handleBlurForInput}
                onChange={(e) =>
                  setName({ hasError: false, value: e.target.value })
                }
              />
              <div
                className={classNames("form__icon", {
                  "form__icon--danger": name.hasError,
                })}
              />
              {!!name.hasError && (
                <p className="form__content__error">
                  Поле обов'язкове для заповнення
                </p>
              )}
            </div>

            <div className="form__content__item">
              <label className="form__text">Ваш номер телефону</label>
              <div
                className={classNames("form__content__input", {
                  "form__content__input--danger": phone.hasError,
                })}
              >
                <span className="form__content__input__prefix"> +38 </span>
                <input
                  type="tel"
                  data-custom="phone"
                  className="form__content__input-phone"
                  value={phone.value}
                  onFocus={handleFocusForInput}
                  onBlur={handleBlurForInput}
                  placeholder="(000) 000-00-00"
                  onChange={(e) =>
                    setPhone({ hasError: false, value: e.target.value })
                  }
                />
                <div
                  className={classNames("form__icon", {
                    "form__icon--danger": phone.hasError,
                  })}
                />
              </div>
              {!!phone.hasError && (
                <p className="form__content__error">
                  Поле обов'язкове для заповнення
                </p>
              )}
            </div>
          </div>

          <div className="form__content__big-item">
            <label className="form__text">Ваше звернення</label>
            <textarea
              value={text.value}
              placeholder=" Опишіть ситуацію"
              onFocus={handleFocusForTextarea}
              onBlur={handleBlurForTextarea}
              className={classNames("form__content__textarea", {
                "form__content__textarea--danger": text.hasError,
              })}
              onChange={(e) =>
                setText({ hasError: false, value: e.target.value })
              }
            />
            <div
              className={classNames("form__icon", {
                "form__icon--danger": text.hasError,
              })}
            />
            {!!text.hasError && (
              <p className="form__content__error">
                Поле обов'язкове для заповнення
              </p>
            )}
          </div>
        </div>

        <MediumButton
          type="submit"
          leftIcon={false}
          rightIcon={true}
          text="Відправити"
        />
      </form>
    </>
  );
};
