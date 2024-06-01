import { NavLink } from 'react-router-dom';
import { Navbar } from '../Navbar';
import './Header.scss';

export const Header = () => {
  return (
       <div className="header">
      <div className="header__content">
        <div className="header__left">
          <NavLink to='/' className="header__logo"/>
          <Navbar />
        </div>

        <div className="header__right">
          <button className="header__donate">Donate</button>
          <div className="header__icons">
            <div className="icon icon-lang"></div>
            <div className="icon icon-like"></div>
          </div>
        </div>
      </div>
      </div>
  )
}