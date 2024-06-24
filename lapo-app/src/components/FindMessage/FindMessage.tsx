import { useContext, useEffect, useState } from "react";
import "./FindMessage.scss";
import { SosForm } from "../SosForm";
import { GlobalContext } from "../../context/GlobalContext";

export const FindMessage = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(true);
  const {isSosFormOpen, setIsSosFormOpen} = useContext(GlobalContext);

  return (
    <div className="find-message">
      {isMessageOpen && (
        <>
          <div
            className="icon icon-close icon-close-form"
            onClick={() => setIsMessageOpen(false)}
          />
          <div className="find-message__text">
            Знайшов тварину, яка потребує допомоги? Заповни форму!
          </div>
        </>
      )}
      <div
        className="icon icon-bot"
        onClick={() => setIsSosFormOpen(true)}
      />
      {isSosFormOpen && <SosForm /> }
    </div>
  );
};
