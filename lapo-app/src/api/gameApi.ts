import { Pet } from "../types/Pet";
import { client } from "../utils/fetchProducts"

type PetGender = 'male' | 'female';

export const getPetsForGame = () => {
  return client.get<Record<PetGender, Pet>>('/heOrShe/')
};