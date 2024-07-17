import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Pet } from "../types/Pet"
import { addAnimalToLiked, getLikedAnimals, removeFromLiked} from "../api/likedApi"

type likedState = {
  pets: Pet[],
  loading: boolean,
  hasError: boolean,
}

interface AnimalArgs {
  category: string;
  animalId: string;
}

const initialState: likedState = {
  pets: [],
  loading: false,
  hasError: false
}

export const postAnimalToLiked = createAsyncThunk('liked/post', ({ category, animalId }: AnimalArgs) => {
  return addAnimalToLiked(category, animalId);
});

export const fetchLikedAnimals = createAsyncThunk('liked/fetch', () => {
  return getLikedAnimals();
})

export const removeAnimalFromLiked = createAsyncThunk('liked/delete', async ({category, animalId}: AnimalArgs) => {
  await removeFromLiked(category, animalId);
  return animalId;
})

const likedSlice = createSlice({
  name: 'pets',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLikedAnimals.pending, state => {
      state.loading = true;
      state.hasError = false;
    });

    builder.addCase(fetchLikedAnimals.fulfilled, (state, action) => {
      state.loading = false;
      state.pets = action.payload;
    })

    builder.addCase(fetchLikedAnimals.rejected, (state) => {
      state.loading = false;
      state.hasError = true;
    })

    builder.addCase(postAnimalToLiked.pending, (state) => {
      state.loading = true;
      state.hasError = false;
    })

    builder.addCase(postAnimalToLiked.fulfilled, (state, action: PayloadAction<Pet>) => {
      state.loading = false;
      state.pets.push(action.payload);
    })

    builder.addCase(postAnimalToLiked.rejected, (state) => {
      state.loading = false;
      state.hasError = true;
    })

    builder.addCase(removeAnimalFromLiked.pending, state => {
      state.loading = true;
    })

    builder.addCase(removeAnimalFromLiked.fulfilled, (state, action) => {
      state.loading = false;
      state.pets = [...state.pets.filter(pet => pet.id !== action.payload)]
    })

    builder.addCase(removeAnimalFromLiked.rejected, (state) => {
      state.loading = false;
      state.hasError = true;
    })
  },
})

export default likedSlice.reducer;
