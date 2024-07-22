import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pet } from "../types/Pet";
import { ApiResponse, getAnimals, getCats, getDogs } from "../api/animalApi";

type animalState = {
  pets: Pet[],
  petsCount: number,
  cats: Pet[],
  catsCount: number,
  dogs: Pet[],
  dogsCount: number,
  loading: boolean,
  hasError: boolean,
}

const initialState: animalState = {
  pets: [],
  petsCount: 0,
  cats: [],
  catsCount: 0,
  dogs: [],
  dogsCount: 0,
  loading: false,
  hasError: false
}

export const fetchAnimals = createAsyncThunk('animals/fetch', async(query: string) => {
  const response = await getAnimals(query);
  return response;
})

export const fetchCats = createAsyncThunk('cats/fetch', async (query: string) => {
  const response = await getCats(query);
  return response;
})

export const fetchDogs = createAsyncThunk('dogs/fetch', async (query: string) => {
  const response = await getDogs(query);
  return response;
})

const animalSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAnimals.pending, state => {
      state.loading = true;
      state.hasError = false;
    });

    builder.addCase(fetchAnimals.fulfilled, (state, action: PayloadAction<ApiResponse<Pet>>) => {
      console.log('success');
      state.loading = false;
      state.pets = action.payload.results;
      state.petsCount = action.payload.count;
    });

    builder.addCase(fetchAnimals.rejected, state => {
      console.log('fail');
      state.loading = false;
      state.hasError = true;
    });

    builder.addCase(fetchCats.pending, state => {
      state.loading = true;
      state.hasError = false;
    });

    builder.addCase(fetchCats.fulfilled, (state, action: PayloadAction<ApiResponse<Pet>>) => {
      state.loading = false;
      state.cats = action.payload.results;
      state.catsCount = action.payload.count;
    });

    builder.addCase(fetchCats.rejected, state => {
      state.loading = false;
      state.hasError = true;
    });

    builder.addCase(fetchDogs.pending, state => {
      state.loading = true;
      state.hasError = false;
    });

    builder.addCase(fetchDogs.fulfilled, (state, action: PayloadAction<ApiResponse<Pet>>) => {
      state.loading = false;
      state.dogs = action.payload.results;
      state.dogsCount = action.payload.count;
    });

    builder.addCase(fetchDogs.rejected, state => {
      state.loading = false;
      state.hasError = true;
    });
  },
})

export default animalSlice.reducer;