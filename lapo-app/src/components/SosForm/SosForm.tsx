import React, { useContext, useEffect, useState } from "react";
import "./SosForm.scss";
import { MediumButton } from "../Buttons";
import classNames from "classnames";
import { GlobalContext } from "../../context/GlobalContext";
import { API_URL } from "../../utils/fetchProducts";

export const SosForm = () => {
  const { setIsSosFormOpen } = useContext(GlobalContext);
  const defaultState = { value: "", hasError: false };
  const [name, setName] = useState(defaultState);
  const [phone, setPhone] = useState(defaultState);
  const [text, setText] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);

  const handleFocusForInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const input =
      e.target.closest(`input[type="text"]`) ||
      e.target.closest(".form__content__input");

    const formItem = input?.closest(".form__content__item");
    const icon = formItem?.querySelector(".form__icon");
    icon?.classList.remove("form__icon--success", "form__icon--danger");
  };
  const handleBlurForInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const input =
      e.target.closest(`input[type="text"]`) ||
      e.target.closest(".form__content__input");
    const formItem = input?.closest(".form__content__item");
    const icon = formItem?.querySelector(".form__icon");

    if (input?.getAttribute("data-custom") === "name") {
      if (e.target.value.trim().length > 2) {
        input?.classList.add("form__content__input--success");
        icon?.classList.add("form__icon--success");
      } else {
        input?.classList.remove("form__content__input--success");
      }
    } else {
      if (e.target.value.replace(/[\(\)\-\s]/g, "").length === 10) {
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

    const icon = formItem?.querySelector(".form__icon");
    icon?.classList.remove("form__icon--success", "form__icon--danger");
  };
  const handleBlurForTextarea = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const textarea = e.target.closest(".form__content__textarea");
    const formItem = textarea?.closest(".form__content__big-item");

    const icon = formItem?.querySelector(".form__icon");

    if (e.target.value.trim().length >= 5) {
      textarea?.classList.add("form__content__textarea--success");
      icon?.classList.add("form__icon--success");
    } else {
      textarea?.classList.remove("form__content__textarea--success");
    }
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const digits = phoneNumber.replace(/\D/g, "");
    let formattedPhoneNumber = "";

    if (digits.length >= 1) {
      formattedPhoneNumber = "(" + digits.substring(0, 3);
    }
    if (digits.length > 3) {
      formattedPhoneNumber += ") " + digits.substring(3, 6);
    }
    if (digits.length > 6) {
      formattedPhoneNumber += "-" + digits.substring(6, 8);
    }
    if (digits.length > 8) {
      formattedPhoneNumber += "-" + digits.substring(8, 10);
    }

    return formattedPhoneNumber;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedInput = formatPhoneNumber(input);
    setPhone({ hasError: false, value: formattedInput });
  };

  const handleClearForm = () => {
    setName({ value: "", hasError: false });
    setPhone({ value: "", hasError: false });
    setText({ value: "", hasError: false });
  };

  const postForm = async (message: {
    name: string;
    phone: string;
    text: string;
  }) => {
    try {
      const response = await fetch(`${API_URL}/sos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok" + response.statusText);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
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

    postForm(newMessage)
      .then(() => console.log("success post form"))
      .catch(() => console.log("form wasn`t post"))
      .finally(() => setIsFormSent(true));
  };

  return (
    <>
      <div className="overlay" />
      <form id="sosForm" className="form" method="post" onSubmit={handleSubmit}>
        <div className="form__header">
          <div className="form__title">SOS! Тваринка у біді!</div>
          <div
            className="icon icon-close icon-close-form"
            onClick={() => setIsSosFormOpen(false)}
          />
        </div>

        {!isFormSent ? (
          <>
            <div className="form__content">
              <div className="form__content__top">
                <div className="form__content__item">
                  <label className="form__text">Ваше ім'я</label>
                  <input
                    name="name"
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
                      id="phone"
                      className="form__content__input-phone"
                      value={phone.value}
                      onFocus={handleFocusForInput}
                      onBlur={handleBlurForInput}
                      pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}"
                      placeholder="(000) 000-00-00"
                      onChange={handlePhoneChange}
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
                  placeholder="Опишіть ситуацію"
                  onFocus={handleFocusForTextarea}
                  onBlur={handleBlurForTextarea}
                  maxLength={200}
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
                {!!text.hasError ? (
                  <p className="form__content__error">
                    Поле обов'язкове для заповнення
                  </p>
                ) : (
                  <div className="form__counter">{text.value.length}/200</div>
                )}
              </div>
            </div>

            <MediumButton
              type="submit"
              leftIcon={false}
              rightIcon={true}
              text="Відправити"
            />
          </>
        ) : (
          <div className="form__success">
            <div className="form__success__content">
              <div className="form__success__done" />
              <h6 className="form__success__title">
                Ваше звернення успішно відправлено!
              </h6>
              <p className="form__success__text">
                Ми зв'яжемося з вами найближчим часом
              </p>
            </div>
            <MediumButton
              leftIcon={false}
              rightIcon={true}
              text="Закрити"
              onClick={() => setIsSosFormOpen(false)}
            />
          </div>
        )}
      </form>
    </>
  );
};
