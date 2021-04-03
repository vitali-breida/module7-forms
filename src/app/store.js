import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import dialogsReducer from "../features/dialogs/dialogsSlice";

export default configureStore({
  reducer: {
    movies: moviesReducer,
    dialogs: dialogsReducer
  }
});
