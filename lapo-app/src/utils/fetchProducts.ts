import { Pet } from "../types/Pet";

export const BASE_URL = process.env.PUBLIC_URL;

export const API_URL = 'http://localhost:8000/api';

export const getCats = async (): Promise<Pet[]> => {
  const response = await fetch(`${API_URL}/cats`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  const cats = data.results;

  return cats;
};

export const getDogs = async (): Promise<Pet[]> => {
  const data = await fetch(`${BASE_URL}/dogs`);

  const dogs: Pet[] = await data.json();

  return dogs;
};

export const getPetById = async (category: string, id: string): Promise<Pet[]> => {
  const response = await fetch(`${API_URL}/${category}/${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  const pet = data.results;

  return pet;
};