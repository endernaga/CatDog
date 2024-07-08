import { useContext, useEffect } from "react";
import { BASE_URL } from "../../utils/fetchProducts";
import "./Loader.scss";
import { GlobalContext } from "../../context/GlobalContext";

export const Loader = () => {
  const { setIsLoading} = useContext(GlobalContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
      <div className="loader">
      <img src={`${BASE_URL}/img/catskate.png`} alt="catOnSkate" />
    </div>
  );
};



