import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Pet } from "../types/Pet"

type likedState = {
  pets: Pet[],
  loading: boolean,
  hasError: boolean,
}

const loadStateFromLocalStorage = (): likedState => {
  const pets = JSON.parse(localStorage.getItem('pets') || '[]');
  return {
    pets,
    loading: false,
    hasError: false,
  };
};

const initialState: likedState = loadStateFromLocalStorage();

const likedSlice = createSlice({
  name: 'liked',
  initialState: initialState,
  reducers: {
    addPet(state, action: PayloadAction<Pet>) {
      state.pets.push(action.payload);
      localStorage.setItem('pets', JSON.stringify(state.pets));
    },
    removePet(state, action: PayloadAction<Pet>) {
      state.pets = state.pets.filter(pet => pet.id !== action.payload.id || pet.category !== action.payload.category);
      localStorage.setItem('pets', JSON.stringify(state.pets));
    },
    getPets(state) {
      const pets = JSON.parse(localStorage.getItem('pets') || '[]');
      state.pets = pets;
    }
  },
});

export default likedSlice.reducer;

export const {
  addPet,
  removePet,
  getPets
} = likedSlice.actions;