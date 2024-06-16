import React from "react";
import { BASE_URL } from "../../utils/fetchProducts";
import "./PetCard.scss";
import { Pet } from "../../types/Pet";
import { Link } from "react-router-dom";

type Props = {
  pet: Pet;
};

export const PetCard: React.FC<Props> = ({ pet }) => {
  return (
    <div className="card">
      <Link to={`/${pet.category}/${pet.id}`} >
      <img
        src={`${BASE_URL}/${pet.images[0]}`}
        alt="petPhoto"
        className="card__img"
      />

      <div className="card__icon icon icon-like"></div>

      <div className="card__info">
      <p className="card__name">{pet.name}</p>
      <div className="card__props">
        <div className="card__prop">{pet.sex}</div>
        <div className="card__prop">{pet.age}</div>
            {pet.size && (
              <div className="card__prop">{pet.size}</div>
        )}
      </div>
      </div>
      </Link>
    </div>
  );
};
