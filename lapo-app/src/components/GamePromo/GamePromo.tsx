import { BigButton } from '../Buttons';
import { SectionsHeader } from '../SectionsHeader';
import './GamePromo.scss';

export const GamePromo = () => {
  return (
    <div className="game-promo">
      <SectionsHeader text="Легендарна гра!\nВгадаєш де він, а де вона?" />
      <div className="game-promo__photos">
        <div className="game-promo__img" />
        <div className="game-promo__img game-promo__img-2" />
      </div>
      <BigButton to='/game' leftIcon={false} rightIcon={true} text='Грати зараз!' />
    </div>
  );
};
