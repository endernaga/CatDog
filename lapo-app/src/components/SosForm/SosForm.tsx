import React, { useContext, useState } from "react";
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

  const handleBlurForInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const input =
      e.target.closest(`input[type="text"]`) ||
      e.target.closest(".form__input");
    const formItem = input?.closest(".form__item");
    const icon = formItem?.querySelector(".form__icon");

    if (input?.getAttribute("data-custom") === "name") {
      if (e.target.value.trim().length > 2) {
        input?.classList.add("form__input--success");
        icon?.classList.add("form__icon--success");
      } else {
        input?.classList.remove("form__input--success");
        icon?.classList.remove("form__icon--success");
      }
    } else {
      if (e.target.value.replace(/[\(\)\-\s]/g, "").length === 10) {
        input?.classList.add("form__input--success");
        icon?.classList.add("form__icon--success");
      } else {
        input?.classList.remove("form__input--success");
        icon?.classList.remove("form__icon--success");
      }
    }
  };

  const handleBlurForTextarea = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const textarea = e.target.closest(".form__textarea");
    const formItem = textarea?.closest(".form__big-item");

    const icon = formItem?.querySelector(".form__icon");

    if (e.target.value.trim().length >= 5) {
      textarea?.classList.add("form__textarea--success");
      icon?.classList.add("form__icon--success");
    } else {
      textarea?.classList.remove("form__textarea--success");
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

    if (phone.value.replace(/[\(\)\-\s]/g, "").length !== 10) {
      setPhone((prevPhone) => ({ ...prevPhone, hasError: true }));
    }

    if (
      name.hasError ||
      text.hasError ||
      phone.hasError
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
      .then(() => setIsFormSent(true))
      .catch(() => console.log("form wasn`t post"))
  };

  return (
    <>
      <div className="overlay" />
      <form
        id="sosForm"
        className="form"
        method="post"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="form__header">
          <div className="form__title">SOS! Тваринка у біді!</div>
          <button
            className="icon icon-close icon-close-form"
            onClick={() => setIsSosFormOpen(false)}
          />
        </div>

        {!isFormSent ? (
          <>
            <div className="form__content">
              <div className="form__content__top">
                <div className="form__item">
                  <label htmlFor="name" className="form__label">
                    Ваше ім'я
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    data-custom="name"
                    value={name.value}
                    className={classNames("form__input", {
                      "form__input--danger": name.hasError,
                    })}
                    minLength={2}
                    placeholder="Ім'я"
                    onFocus={() =>
                      setName((prev) => ({ ...prev, hasError: false }))
                    }
                    onBlur={handleBlurForInput}
                    onChange={(e) =>
                      setName((prev) => ({ ...prev, value: e.target.value }))
                    }
                  />
                  <div
                    className={classNames("form__icon", {
                      "form__icon--danger": name.hasError,
                    })}
                  />
                  {!!name.hasError && (
                    <p className="form__error">
                      Поле обов'язкове для заповнення
                    </p>
                  )}
                </div>

                <div className="form__item">
                  <label htmlFor="phone" className="form__label">
                    Ваш номер телефону
                  </label>
                  <div
                    className={classNames("form__input", {
                      "form__input--danger": phone.hasError,
                    })}
                  >
                    <input
                      type="text"
                      value="+38"
                      className="form__input-prefix"
                      readOnly
                    />
                    <input
                      id="phone"
                      type="tel"
                      data-custom="phone"
                      className="form__input-phone"
                      value={phone.value}
                      onFocus={() =>
                        setPhone((prev) => ({ ...prev, hasError: false }))
                      }
                      onBlur={handleBlurForInput}
                      placeholder="(000) 000-00-00"
                      pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}"
                      onChange={handlePhoneChange}
                      required
                    />
                  </div>
                  <div
                    className={classNames("form__icon", {
                      "form__icon--danger": phone.hasError,
                    })}
                  />

                  {!!phone.hasError && (
                    <p className="form__error">
                      Поле обов'язкове для заповнення
                    </p>
                  )}
                </div>
              </div>

              <div className="form__big-item">
                <label htmlFor="text" className="form__label">
                  Ваше звернення
                </label>
                <textarea
                  id="text"
                  value={text.value}
                  placeholder="Опишіть ситуацію"
                  onFocus={() =>
                    setText((prev) => ({ ...prev, hasError: false }))
                  }
                  onBlur={handleBlurForTextarea}
                  minLength={5}
                  maxLength={200}
                  className={classNames("form__textarea", {
                    "form__textarea--danger": text.hasError,
                  })}
                  onChange={(e) =>
                    setText((prev) => ({ ...prev, value: e.target.value }))
                  }
                />
                <div
                  className={classNames("form__icon", {
                    "form__icon--danger": text.hasError,
                  })}
                />
                {!!text.hasError ? (
                  <p className="form__error">Поле обов'язкове для заповнення</p>
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
