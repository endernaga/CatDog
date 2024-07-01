import { Link, NavLink } from 'react-router-dom';
import './Footer.scss';
import { socialMedias } from '../../utils/socialMedias';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export const Footer = () => {
  const { setIsSosFormOpen, scrollToSection } = useContext(GlobalContext);

  return (
    <div className="footer">
      <div className="footer__top">
        <div className="footer__social">
          <NavLink to='/'
            className="footer__social__logo"
          />
          <div className="footer__social__medias">
            {socialMedias.map(media => (
              <a
                target='_blank'
                href={media.url}
                className="social-media"
                key={media.name}
              >
                <div dangerouslySetInnerHTML={{__html: media.svg}} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__about">
          <p className="footer__title">Про нас</p>
          <ul className="footer__list">
            <NavLink to="/about" className="footer__item">
              Про притулок
            </NavLink>
            <NavLink to="/reports" className="footer__item">
              Звіти
            </NavLink>
            <NavLink to="/happyMoments" className="footer__item">
              Щасливі події
            </NavLink>
            <NavLink to="/rulesOfAdopts" className="footer__item">
              Правила адапції
            </NavLink>
          </ul>
        </div>

        <div className="footer__on-site">
          <p className="footer__title">На сайті</p>
          <ul className="footer__list">
            <NavLink to="/pets" className="footer__item">
              Знайти друга
            </NavLink>
            <NavLink to="/contacts" className="footer__item">
              Контакти
            </NavLink>
            <NavLink to="/game" className="footer__item">
              Він чи вона
            </NavLink>
          </ul>
        </div>

        <div className="footer__help">
          <p className="footer__title">Допомога</p>
          <ul className="footer__list">
            <Link
              to="/"
              onClick={() => scrollToSection('donate')}
              className="header__donate"
            >
              Задонатити
            </Link>
            <button onClick={() => setIsSosFormOpen(true)} className="footer__sos">
              Тваринка в біді!
            </button>
          </ul>
        </div>
      </div>
      <div className="footer__down">
        <div className="footer__vuso">© 2024 VusoLapoHvist</div>
        <div className="footer__by">Made with 💛 by Team 74</div>
      </div>
    </div>
  );
};
