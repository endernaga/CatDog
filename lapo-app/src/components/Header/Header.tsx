import { Link, NavLink } from 'react-router-dom';
import { Navbar } from '../Navbar';
import './Header.scss';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export const Header = () => {
  const { scrollToSection } = useContext(GlobalContext);
  return (
       <div className="header">
      <div className="header__content">
        <div className="header__left">
          <NavLink to='/' className="header__logo"/>
          <Navbar />
        </div>

        <div className="header__right">
          <Link
            to='/'
            className="header__donate"
            onClick={() => scrollToSection('donate')}
          >Задонатити
          </Link>
          <div className="header__icons">
            <div className="icon icon-lang"></div>
            <div className="icon icon-like"></div>
          </div>
        </div>
      </div>
      </div>
  )
}