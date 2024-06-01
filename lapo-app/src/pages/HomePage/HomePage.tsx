import { Categories } from '../../components/Categories';
import { FindMessage } from '../../components/FindMessage';
import { GamePromo } from '../../components/GamePromo';
import { HowToHelp } from '../../components/HowToHelp';
import { Reasons } from '../../components/Reasons';
import { Start } from '../../components/Start';
import './HomePage.scss';

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