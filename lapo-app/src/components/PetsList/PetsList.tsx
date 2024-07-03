import React from 'react';
import { catData } from '../../utils/catData';
import { PetCard } from '../PetCard';
import './PetsList.scss';
import { Pet } from '../../types/Pet';

type Props = {
  pets: Pet[],
}

export const PetsList: React.FC<Props> = ({pets}) => {
  const pet = catData[0];

  return (
    <div className="list">
      {pets.map(pet => <PetCard pet={pet} />)}
    </div>
  )
}