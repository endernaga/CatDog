import { NavLink } from 'react-router-dom';
import { SectionsHeader } from '../SectionsHeader';
import './Categories.scss';
import { BASE_URL } from '../../utils/fetchProducts';
import { BigButton } from '../Buttons';

export const Categories = () => {
  const categories = [
    {
      title: 'Песики',
      img: 'img/dogCategory.png',
      class: 'dog',
    }, 
    {
      title: 'Котики',
      img: 'img/catCategory.png',
      class: 'cat',
    }
  ]
  return (
    <div className="categories">
      <SectionsHeader text='Вони дуже чекають на тебе' />
      <div className="categories__content">
        {categories.map(category => (
          <div className="categories__category">
            <div className="categories__category__title">{category.title}</div>
            <div className="categories__category__photo">
              <img src={`${BASE_URL}/${category.img}`} alt="categoryImg" className={`categories__category__${category.class}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="categories__footer">
        <BigButton to='/pets' leftIcon={false} rightIcon={true} text='Переглянути всіх хвостиків притулку' />
      </div>
    </div>
  )
}