import { SectionsHeader } from '../SectionsHeader';
import './HowToHelp.scss';

export const HowToHelp = () => {
  const donate = [
    '50 UAH',
    '100 UAH',
    '200 UAH',
    '500 UAH',
    '1000 UAH',
    'Інша сума',
  ];
  return (
    <div className="help">
      <SectionsHeader text="Як ще можна допомогти?" />
      <div className="help__content">
        <div className="help__left">
          <div className="help__meme-text1" />
          <img className="help__meme-cat" src='../../../img/memeCat.png' />
          <div className="help__meme-text2" />
        </div>

        <div className="help__right">
          <div className="help__buttons">
            <div className="button button-help">Разова допомога</div>
            <div className="button button-help">Щомісячна допомога</div>
          </div>

          <div className="help__main">
            <p className="help__main__text">Обери суму разового внеску</p>

            <div className="help__main__select">
              <div className="help__main__options">
                {donate.map(sum => (
                  <div className="button button-donate">{sum}</div>
                ))}
              </div>
              <div className="button button-continue">Продовжити</div>
            </div>
          </div>
          <p className="help__footer">Подаруй підтримку в два кліки!</p>
        </div>
      </div>
    </div>
  );
};
