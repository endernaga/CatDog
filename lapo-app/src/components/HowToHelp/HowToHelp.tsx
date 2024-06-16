import { BASE_URL } from '../../utils/fetchProducts';
import { BigButton, MediumButton } from '../Buttons';
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
          <img className="help__meme-cat" src={`${BASE_URL}/img/memeCat.png`} />
          <div className="help__meme-text" />
        </div>

        <div className="help__right">
          <div className="help__buttons">
            <MediumButton to='backend' leftIcon={false} rightIcon={false} text='Разова допомога' width='295' />
            <MediumButton to='backend' leftIcon={false} rightIcon={false} text='Щомісячна допомога' width='295' />
          </div>

          <div className="help__main">
            <p className="help__main__text">Обери суму разового внеску</p>

            <div className="help__main__select">
              <div className="help__main__options">
                {donate.map(sum => (
                  <div className="button button-donate">{sum}</div>
                ))}
              </div>
              <BigButton to='backendPart' leftIcon={false} rightIcon={true} text='Продовжити' width='614'/>
            </div>
          </div>
          <p className="help__footer">Подаруй підтримку в два кліки!</p>
        </div>
      </div>
    </div>
  );
};
