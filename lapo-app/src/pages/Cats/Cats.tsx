import { useContext, useEffect, useState } from 'react';
import { CategoryPage } from '../CategoryPage';
import './Cats.scss';
import { GlobalContext } from '../../context/GlobalContext';
import { Pet } from '../../types/Pet';
import { getCats } from '../../utils/fetchProducts';
import { useSearchParams } from 'react-router-dom';

export const Cats = () => {
  const { isLoading, setIsLoading } = useContext(GlobalContext);
  const [cats, setCats] = useState<Pet[]>([]);
  const [count, setCount] = useState(0);
  const [searchParams] = useSearchParams();

  const fetchData = () => {
    setIsLoading(true);
    getCats(searchParams.toString())
      .then((data) => {
        setCats(data.results);
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
      <CategoryPage pets={cats} count={count} fetchData={fetchData} />
    )
}