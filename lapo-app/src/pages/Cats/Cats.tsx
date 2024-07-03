import { useContext, useEffect, useState } from 'react';
import { CategoryPage } from '../CategoryPage';
import './Cats.scss';
import { GlobalContext } from '../../context/GlobalContext';
import { Pet } from '../../types/Pet';
import { getCats } from '../../utils/fetchProducts';

export const Cats = () => {
  const { setIsLoading } = useContext(GlobalContext);
  const [cats, setCats] = useState<Pet[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getCats().then(data => setCats(data)).catch(error => {
      console.error('Error fetching cats:', error);
    });
    setIsLoading(false);
  }, []);

  return (
    <CategoryPage pets={cats} />
  )
}