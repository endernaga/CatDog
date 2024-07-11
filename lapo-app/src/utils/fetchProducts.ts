import { Pet } from "../types/Pet";

export const BASE_URL = process.env.PUBLIC_URL;

export const API_URL = "http://localhost:8000/api";
export const MEDIA_URL = "http://localhost:8000";

export const getCats = async (query: string) => {
  const response = await fetch(`${API_URL}/cats?${query}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
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
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getPetById = async (
  category: string,
  id: string
): Promise<Pet> => {
  const response = await fetch(`${API_URL}/${category}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getAnimals = async (query: string) => {
  const response = await fetch(`${API_URL}/animals?${query}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getPetsForGame = async () => {
  const response = await fetch(`${API_URL}/heOrShe`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const postAnimalToLiked = async (category: string, animalId: string) => {
  const response = await fetch(`${API_URL}/liked_animals/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ kind: category, id: animalId }),
  });

  if (!response.ok) {
    throw new Error(`Post error! Status: ${response.status}`);
  } else {
    console.log("added");
  }
};

export const getLikedAnimals = async (): Promise<Pet> => {
  const response = await fetch(`${API_URL}/liked_animals/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

type httpMethod = "GET" | "POST" | "DELETE";

function request<T>(
  url: string,
  method: httpMethod = "GET",
  data: any = null
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "application/json",
    };
  }

  return fetch(API_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  delete: <T>(url: string) => request<T>(url, 'DELETE'),
};
