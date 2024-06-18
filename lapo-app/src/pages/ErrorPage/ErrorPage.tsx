import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/fetchProducts';
import './ErrorPage.scss';
import { LargeButton } from '../../components/Buttons';

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error">
      
        <img
          src={`${BASE_URL}/img/404cat.webp`}
          className="error__img"
          alt="404cat" />
      
      <div className="error__right">
        <div className="error__texts">
          <h2 className="error__title">Вибачте, сторінку, яку ви шукаєте, не знайдено</h2>
          <h5 className="error__description">Сторінка тимчасово не працює або в розробці</h5>
        </div>
        <LargeButton leftIcon={false} rightIcon={true} text='Повернутися' type='button' onClick={() => navigate(-1)}  />
      </div>
    </div>
  )
}