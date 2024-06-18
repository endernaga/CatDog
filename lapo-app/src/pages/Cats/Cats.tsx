import { BigSectionsHeader } from '../../components/BigSectionsHeader';
import { BreadCrumb } from '../../components/BreadCrumb';
import { Filter } from '../../components/Filter';
import { PetsList } from '../../components/PetsList';
import './Cats.scss';

export const Cats = () => {
  return (
    <div className="cats">
      <BreadCrumb />
      <BigSectionsHeader text={['Супер', 'Друзі']} />
      <Filter />
      <PetsList />
    </div>
  )
}