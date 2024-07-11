import { Pet } from "../types/Pet"
import { client } from "../utils/fetchProducts"

export const getLikedAnimals = () => {
  return client.get<Pet>('/liked_animals/')
};

export const addAnimalToLiked = (category: string, animalId: string) => {
  return client.post<Pet>('/liked_animals/', { kind: category, id: animalId })
};