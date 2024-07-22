import { Pet } from "../types/Pet"
import { client } from "../utils/fetchProducts"

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const getAnimals = (query: string) => {
  return client.get<ApiResponse<Pet>>(`/animals/${query}`)
};

export const getCats = (query: string) => {
  return client.get<ApiResponse<Pet>>(`/cats/${query}`);
};

export const getDogs = (query: string) => {
  return client.get<ApiResponse<Pet>>(`/dogs/${query}`)
};

export const getAnimalById = (category: string, id: string) => {
  return client.get<Pet>(`/${category}/${id}`)
};