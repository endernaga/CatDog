import { Pet } from "../types/Pet";

export const BASE_URL = process.env.PUBLIC_URL;

export const API_URL = 'http://localhost:8000/api';

export const getCats = async (query: string) => {
  const response = await fetch(`${API_URL}/cats?${query}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getDogs = async (query: string) => {
  const response = await fetch(`${API_URL}/dogs?${query}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getPetById = async (category: string, id: string): Promise<Pet> => {
  const response = await fetch(`${API_URL}/${category}/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getAnimals = async (query: string) => {

  const response = await fetch(`${API_URL}/animals?${query}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getPetsForGame = async () => {
  const response = await fetch(`${API_URL}/heOrShe`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
