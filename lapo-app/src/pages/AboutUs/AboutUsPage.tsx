import { BigSectionsHeader } from '../../components/BigSectionsHeader';
import { BreadCrumb } from '../../components/BreadCrumb';
import { PhotoSlider } from '../../components/PhotoSlider';
import './AboutUsPage.scss';

export const AboutUsPage = () => {
  const circlesContent = [
    {
      big: '2023',
      small: 'Рік заснування притулку',
    },
    {
      big: '500+',
      small: 'Котів і собак під опікою',
    },
    {
      big: '200+',
      small: 'Хвостиків знайшли дім',
    },
  ];



  return (
    <div className="about">
      <BreadCrumb title="Про притулок" />

      <div className="about__section">
        <BigSectionsHeader text={['Супер', 'Місія']} />
        <div className="about__texts">
          <h1 className="about__text">
            Врятувати і надати прихисток тваринам, які потребують допомоги.
          </h1>
          <h1 className="about__text">
            Соціалізація, реабілітація та влаштування до люблячих родин.
          </h1>
        </div>

        <PhotoSlider />
        <div className="about__circles">
          {circlesContent.map(circle => (
            <div className="about__circle">
              <p className="about__circle__bigger-text">{circle.big}</p>
              <p className="about__circle__smaller-text">{circle.small}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about__section">
        <BigSectionsHeader text={['Супер', 'Команда']} />
        <div className="about__team">
          <div className="about__team__card">

          </div>
        </div>
      </div>

      <div className="about__section">
        <BigSectionsHeader text={['Супер', 'Допомога']} />
        <div className="about__help">
        </div>
      </div>
    </div>
  );
};
