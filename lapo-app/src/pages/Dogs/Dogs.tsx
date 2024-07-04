import { useContext, useEffect, useState } from 'react';
import './Dogs.scss';
import { GlobalContext } from '../../context/GlobalContext';
import { Pet } from '../../types/Pet';
import { getDogs } from '../../utils/fetchProducts';
import { CategoryPage } from '../CategoryPage';
import { useSearchParams } from 'react-router-dom';

export const Dogs = () => {
  const { setIsLoading } = useContext(GlobalContext);
  const [dogs, setDogs] = useState<Pet[]>([]);
  const [count, setCount] = useState(0);

  const [searchParams] = useSearchParams();

  const fetchData = () => {
    setIsLoading(true);
    getDogs(searchParams.toString())
      .then((data) => {
        setDogs(data.results);
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

  return (
    <CategoryPage pets={dogs} count={count} fetchData={fetchData} />
  )
}