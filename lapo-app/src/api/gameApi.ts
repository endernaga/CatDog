import { Pet } from "../types/Pet";
import { client } from "../utils/fetchProducts"

type PetGender = 'male' | 'female';

interface GameApiResponse {
  [key: string]: Pet;
}
export const getPetsForGame = () => {
  return client.get<Record<PetGender, Pet>>('/heOrShe/')
};