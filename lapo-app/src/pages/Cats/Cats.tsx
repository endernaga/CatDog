import { catData } from '../../utils/catData';
import { CategoryPage } from '../CategoryPage';
import './Cats.scss';

export const Cats = () => {
  return (
    <CategoryPage pets={catData} />
  )
}