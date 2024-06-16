import { useEffect, useState } from "react";
import "./FindMessage.scss";
import { SosForm } from "../SosForm";

export const FindMessage = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

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
        onClick={() => setIsFormOpen(true)}
      />
      {isFormOpen && <SosForm handleCloseForm={handleCloseForm} /> }

    </div>
  );
};
