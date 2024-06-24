import './AllPetsPage.scss';
import { catData } from '../../utils/catData';
import { CategoryPage } from '../CategoryPage';

export const AllPetsPage = () => {
  return (
    <CategoryPage pets={catData} />
  )
}