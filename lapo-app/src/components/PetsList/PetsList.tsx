import { catData } from '../../utils/catData';
import { PetCard } from '../PetCard';
import './PetsList.scss';

export const PetsList = () => {
  const pet = catData[0];

  return (
    <div className="list">
      <PetCard pet={pet} />
      <PetCard pet={pet} />
      <PetCard pet={pet} />
      <PetCard pet={pet} />
      <PetCard pet={pet} />
      <PetCard pet={pet} />
      <PetCard pet={pet} />
      <PetCard pet={pet} />
      <PetCard pet={pet} />
    </div>
  )
}