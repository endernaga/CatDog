import { useContext } from "react";
import { BASE_URL } from "../../utils/fetchProducts";
import "./Loader.scss";
import { GlobalContext } from "../../context/GlobalContext";

export const Loader = () => {
  return (
      <div className="loader">
      <img src={`${BASE_URL}/img/catskate.png`} alt="catOnSkate" />
    </div>
  );
};



