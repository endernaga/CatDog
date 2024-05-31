import './HomePage.scss';
import { FindMessage } from '../components/FindMessage';
import { GamePromo } from '../components/GamePromo';
import { Start } from '../components/Start';
import { Reasons } from '../components/Reasons';
import { HowToHelp } from '../components/HowToHelp';
import { Categories } from '../components/Categories';

export const HomePage = () => {
  return (
    <div className="home-page">
      <Start />
      <FindMessage />
      <GamePromo />
      <Reasons />
      <HowToHelp />
      <Categories />
    </div>
  )
}