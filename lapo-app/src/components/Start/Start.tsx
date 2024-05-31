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
            src="../../../img/catDogHero.png"
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

        <div className="button button-large">
          <p className="">Детальніше про притулок</p>
          <div className="icon icon-right"></div>
        </div>
      </div>
    </div>
  );
};
