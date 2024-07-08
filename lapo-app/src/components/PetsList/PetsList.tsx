import React from 'react';
import { PetCard } from '../PetCard';
import './PetsList.scss';
import { Pet } from '../../types/Pet';

type Props = {
  pets: Pet[],
}

export const PetsList: React.FC<Props> = ({pets}) => {
  return (
    <div className="list">
      {pets.map(pet => <PetCard pet={pet} />)}
    </div>
  )
}