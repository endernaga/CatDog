import "./AllPetsPage.scss";
import { CategoryPage } from "../CategoryPage";
import { useContext, useEffect, useState } from "react";
import { getAnimals } from "../../utils/fetchProducts";
import { GlobalContext } from "../../context/GlobalContext";
import { Pet } from "../../types/Pet";
import { useSearchParams } from "react-router-dom";

export const AllPetsPage = () => {
  const [animals, setAnimals] = useState<Pet[]>([]);
  const [count, setCount] = useState(0);
  const { setIsLoading } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();

  const fetchData = () => {
    setIsLoading(true);
    getAnimals(searchParams.toString())
      .then((data) => {
        setAnimals(data.results);
        setCount(data.count);
      })
      .catch((error) => {
        console.error("Error fetching cats:", error);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return <CategoryPage pets={animals} count={count} fetchData={fetchData} />;
};
