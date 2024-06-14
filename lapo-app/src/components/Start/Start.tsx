import { BASE_URL } from '../../utils/fetchProducts';
import { LargeButton } from '../Buttons';
import './Start.scss';

export const Start = () => {
  return (
    <div className="start">
      <div className="start__left">
        {/*
        <div className="start__circle">
          <img
            src="../../../img/kitPes.png"
            alt="kitPes"
            className="start__animals"
          />
        </div> */}

        
        <img
          src={`${BASE_URL}/img/catDogHero.png`}
            alt="kitPes"
            className="start__animals"
          />
        
      </div>
      <div className="start__right">
        <div className="start__info">
          <h1 className="start__title">
            Знайди свого
            <br />
            хвостатого друга!
          </h1>
          <h5 className="start__text">
            ВусоЛапоХвіст - центр адопції безхатніх тварин,
            <br /> а також тварин, евакуйованих із зони бойових дій
          </h5>
        </div>

        <LargeButton to='/about' text='Детальніше про притулок' leftIcon={false} rightIcon={true} />
      </div>
    </div>
  );
};
