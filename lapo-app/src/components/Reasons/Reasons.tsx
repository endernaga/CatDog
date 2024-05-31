import classNames from 'classnames';
import { SectionsHeader } from '../SectionsHeader';
import './Reasons.scss';

export const Reasons = () => {
  const reasons = [
    {
      image: 'img/reasons/Reason1.jpg',
      text: 'У вас є можливість не тільки знайти вірного друга і компаньйона, але і звільнити місце для того, хто потребує зараз допомоги.',
    },
    {
      image: 'img/reasons/Reason2.jpeg',
      text: 'Отримаєте підтримку від наших лікарів і волонтерів, а аткож рекомендації по догляду і вихованню тварин.',
    },
    {
      image: 'img/reasons/Reason3.jpg',
      text: 'Ви можете взяти додому будь-яку здорову, привиту, стерилізовану домашню тварину безкоштовно.'
    },
    {
      image: 'img/reasons/Reason4.jpeg',
      text: 'Плюсик до вашої карми. Ендорфіни від добрих вчинків стимулюють вас на нові звершення.'
    }
  ];
  return (
    <div className="reasons">
      <SectionsHeader text="Причини чому варто взяти\n тваринку з притулку" />
      <div className="reasons__content">
        {reasons.map((reason, index) => (
          <div
            className={classNames('reasons__wrapper', {
              'reasons__wrapper--right': index % 2 !== 0,
            })}
          >
            <div
              className="reasons__img"
              style={{ backgroundImage: `url('../../../../${reason.image}')` }}
            />
            <div className="reasons__block">
              <p className="reasons__text">{reason.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
