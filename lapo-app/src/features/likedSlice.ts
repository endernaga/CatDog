import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Pet } from "../types/Pet"
import { addAnimalToLiked, getLikedAnimals} from "../api/likedApi"

type likedState = {
  pets: Pet[] | [],
  loaded: boolean,
  hasError: boolean,
}

const initialState: likedState = {
  pets: [],
  loaded: false,
  hasError: false
}

export const postAnimalToLiked = createAsyncThunk('liked/post', ({ category, animalId }: { category: string, animalId: string }) => {
  return addAnimalToLiked(category, animalId)
});

export const fetchLikedAnimals = createAsyncThunk('liked/fetch', () => {
  return getLikedAnimals();
})

const likedSlice = createSlice({
  name: 'pets',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase()
  },
})