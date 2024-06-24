import { NavLink, useLocation } from "react-router-dom";
import "./Buttons.scss";
import React from "react";
import classNames from "classnames";
import { returnName } from "../BreadCrumb";

type Props = {
  to?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  text: string;
  leftIcon: boolean;
  rightIcon: boolean;
  width?: string;
};

export const BigButton: React.FC<Props> = ({
  to,
  type,
  onClick,
  text,
  leftIcon,
  rightIcon,
  width,
}) => {
  const renderContent = () => (
    <>
      {leftIcon && (
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
      )}
      <p className="text">{text}</p>
      {rightIcon && (
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
      )}
    </>
  );
  return (
    <>
      {to ? (
        <NavLink to={to} className="bigButton" style={{ width: `${width}px` }}>
          {renderContent()}
        </NavLink>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className="bigButton"
          style={{ width: `${width}px` }}
        >
          {renderContent()}
        </button>
      )}
    </>
  );
};

export const MediumButton: React.FC<Props> = ({
  to,
  type,
  onClick,
  text,
  leftIcon,
  rightIcon,
  width,
}) => {
  const renderContent = () => (
    <>
      {leftIcon && (
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
      )}
      <p className="text">{text}</p>
      {rightIcon && (
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
      )}
    </>
  );
  return (
    <>
      {to ? (
        <NavLink
          to={to}
          className="mediumButton"
          style={{ width: `${width}px` }}
        >
          {renderContent()}
        </NavLink>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className="mediumButton"
          style={{ width: `${width}px` }}
        >
          {renderContent()}
        </button>
      )}
    </>
  );
};

export const LargeButton: React.FC<Props> = ({
  to,
  text,
  type,
  onClick,
  leftIcon,
  rightIcon,
  width,
}) => {
  const renderContent = () => (
    <>
      {leftIcon && (
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
      )}
      <p className="text">{text}</p>
      {rightIcon && (
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
      )}
    </>
  );
  return (
    <>
      {to ? (
        <NavLink
          to={to}
          className="mediumButton"
          style={{ width: `${width}px` }}
        >
          {renderContent()}
        </NavLink>
      ) : (
        <button
          type={type}
          className="mediumButton"
          style={{ width: `${width}px` }}
          onClick={onClick}
        >
          {renderContent()}
        </button>
      )}
    </>
  );
};

type AnimalProps = {
  to: string;
  title: string;
};

export const AnimalButton: React.FC<AnimalProps> = ({ to, title }) => {
  const { pathname } = useLocation();
  const fullPath = pathname.split('/');
  const lastPath = fullPath[fullPath.length - 1];
  
  const names = {
    Усі: 'pets',
    Котики: 'cats',
    Песики: 'dogs',
  };

  const buttonKey = returnName(names, title);

  return (
    <NavLink
      to={`/${to}`}
      className={classNames('animalButton', {
        'animalButton--active': lastPath === buttonKey,
      })}
    >
      <div className="animalButton__animals">
        {to !== 'cats' && (
          <div className="dog" />
        )}
        {to !== "dogs" && (
          <svg
            className="cat"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.864 13.7535C29.8301 11.5686 29.8727 9.38295 29.877 7.19726C29.8779 6.50229 29.8649 5.80818 29.8518 5.11321C29.8362 4.28445 29.5156 3.61207 28.7598 3.22549C28.0214 2.84846 27.2995 2.96314 26.6298 3.42877C25.3345 4.32876 24.0349 5.22267 22.7544 6.14264C22.3617 6.42497 22.0004 6.4797 21.5443 6.31986C19.9528 5.76214 18.3604 5.45288 16.7681 5.38599V5.37209C16.6612 5.37209 16.5544 5.37383 16.4475 5.37556C16.3407 5.37296 16.2338 5.37209 16.127 5.37209V5.38599C14.5337 5.45288 12.9414 5.76214 11.3508 6.31986C10.8947 6.4797 10.5333 6.42497 10.1406 6.14264C8.86014 5.22267 7.56054 4.32876 6.26529 3.42877C5.5955 2.96314 4.8736 2.84933 4.13519 3.22636C3.37941 3.61207 3.05885 4.28445 3.04321 5.11321C3.03018 5.80731 3.01715 6.50229 3.01802 7.19726C3.02236 9.38295 3.06493 11.5686 3.03105 13.7535C3.00412 15.5048 2.92159 17.2544 3.22043 18.9901C4.15691 24.4291 7.40591 27.8362 12.5704 29.4929C13.8396 29.8994 15.1384 30.0141 16.4475 29.9985C17.7567 30.015 19.0563 29.9003 20.3246 29.4929C25.49 27.8362 28.7381 24.4291 29.6746 18.9901C29.9734 17.2544 29.8909 15.5048 29.864 13.7535ZM26.7679 21.2244C25.2554 24.8218 22.4425 26.8659 18.7079 27.5722C17.953 27.7146 17.1981 27.8032 16.4466 27.831C15.6952 27.8032 14.9403 27.7146 14.1854 27.5722C10.4508 26.8659 7.63699 24.8218 6.12542 21.2244C5.44956 19.6173 5.20632 17.9381 5.23672 16.185C5.29406 12.8274 5.25323 9.46722 5.25497 6.10876C5.25497 5.92633 5.27408 5.74303 5.28972 5.4633C5.47562 5.57537 5.57466 5.62836 5.665 5.69178C6.95939 6.5935 8.26334 7.48046 9.54035 8.40478C10.1537 8.84869 10.7513 8.91559 11.4507 8.63499C13.1143 7.96868 14.7796 7.61859 16.4466 7.57776C18.1128 7.61859 19.779 7.96868 21.4426 8.63499C22.1428 8.91559 22.7405 8.84869 23.353 8.40478C24.63 7.48046 25.9339 6.59264 27.2283 5.69178C27.3195 5.62836 27.4177 5.57624 27.6036 5.4633C27.6192 5.7439 27.6383 5.92633 27.6383 6.10876C27.6401 9.46809 27.5992 12.8274 27.6566 16.185C27.687 17.9381 27.4429 19.6173 26.7679 21.2244Z"
              fill="currentColor"
            />
            <path
              d="M12.0388 15C12.5911 15 13.0388 14.5523 13.0388 14C13.0388 13.4477 12.5911 13 12.0388 13C11.4865 13 11.0388 13.4477 11.0388 14C11.0388 14.5523 11.4865 15 12.0388 15Z"
              fill="currentColor"
            />
            <path
              d="M21.2646 15C21.8169 15 22.2646 14.5523 22.2646 14C22.2646 13.4477 21.8169 13 21.2646 13C20.7124 13 20.2646 13.4477 20.2646 14C20.2646 14.5523 20.7124 15 21.2646 15Z"
              fill="currentColor"
            />
            <path
              d="M18.1033 17.8825H15.4546C15.0751 17.8825 14.7674 18.1899 14.7674 18.5692C14.7674 18.9485 15.0751 19.2559 15.4546 19.2559H18.1033C18.4828 19.2559 18.7905 18.9485 18.7905 18.5692C18.7905 18.1899 18.4828 17.8825 18.1033 17.8825Z"
              fill="currentColor"
            />
            <path
              d="M13.7901 23.9183C13.2724 23.9183 12.7077 23.8393 12.0961 23.682C11.7243 23.5865 11.5011 23.2077 11.5966 22.8359C11.6922 22.4641 12.0709 22.2408 12.4428 22.3364C13.7146 22.6639 14.6571 22.5727 15.2452 22.0654C16.2425 21.2036 16.0566 19.3515 16.054 19.3324C16.0132 18.9519 16.2877 18.6087 16.6691 18.5662C17.0496 18.5236 17.3927 18.7972 17.4353 19.1777C17.4474 19.2829 17.708 21.7656 16.16 23.1104C15.5415 23.6482 14.7475 23.9183 13.7901 23.9183Z"
              fill="currentColor"
            />
            <path
              d="M19.7982 24.0582C18.84 24.0582 18.0468 23.7889 17.4283 23.2512C15.8803 21.9064 16.1417 19.4236 16.153 19.3185C16.1965 18.9371 16.5405 18.6635 16.9218 18.706C17.3023 18.7495 17.5769 19.0917 17.5343 19.4731C17.5317 19.5009 17.3484 21.3461 18.3431 22.2052C18.9303 22.7125 19.8729 22.8038 21.1455 22.4763C21.5165 22.3807 21.8961 22.604 21.9917 22.9758C22.0872 23.3476 21.864 23.7263 21.4922 23.8219C20.8806 23.9791 20.3151 24.0582 19.7982 24.0582Z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
      <p className="text">{title}</p>
    </NavLink>
  );
};
