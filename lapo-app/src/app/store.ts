import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import likedReducer from "../features/likedSlice";
import animalReducer from "../features/animalSlice";

export const store = configureStore({
  reducer: {
    likedPets: likedReducer,
    animals: animalReducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */