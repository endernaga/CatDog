import { BASE_URL } from '../../utils/fetchProducts';
import { BigButton } from '../Buttons';
import { SectionsHeader } from '../SectionsHeader';
import './GamePromo.scss';

export const GamePromo = () => {
  return (
    <div className="game-promo">
      <SectionsHeader text="Легендарна гра!\nВгадаєш де він, а де вона?" />
      <div className="game-promo__photos">
      <img src={`${BASE_URL}/img/gamePromo/animal1.jpg`} alt="image1" className="game-promo__img" />
      <img src={`${BASE_URL}/img/gamePromo/animal2.webp`} alt="image2" className="game-promo__img" />
      </div>
      <BigButton to='/game' leftIcon={false} rightIcon={true} text='Грати зараз!' />
    </div>
  );
};
