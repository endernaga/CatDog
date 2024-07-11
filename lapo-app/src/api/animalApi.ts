import { Pet } from "../types/Pet"
import { client } from "../utils/fetchProducts"

export const getAnimals = (query: string) => {
  return client.get<Pet[]>(`/animals?${query}`)
};

export const getCats = (query: string) => {
  return client.get<Pet[]>(`/cats?${query}`)
};

export const getDogs = (query: string) => {
  return client.get<Pet[]>(`/dogs?${query}`)
};

export const getAnimalById = (category: string, id: string) => {
  return client.get<Pet>(`/${category}/${id}`)
};