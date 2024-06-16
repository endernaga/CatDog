import './Pets.scss';
import { BigSectionsHeader } from '../../components/BigSectionsHeader';
import { BreadCrumb } from '../../components/BreadCrumb';
import { PetsList } from '../../components/PetsList';
import { Filter } from '../../components/Filter';

export const Pets = () => {
  return (
    <div className="pets">
      <BreadCrumb title1='Знайти друга' />
      <BigSectionsHeader text={['Супер', 'Друзі']} />
      <Filter />
      <PetsList />
    </div>
  )
}