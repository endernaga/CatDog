import { BASE_URL } from "../../utils/fetchProducts";
import "./Loader.scss";

export const Loader = () => {
  return (
      <div className="loader">
      <img src={`${BASE_URL}/img/catskate.png`} alt="catOnSkate" />
    </div>
  );
};



