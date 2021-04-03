import { createSlice } from "@reduxjs/toolkit";

export const dialogsSlice = createSlice({
  name: "dialogs",
  initialState: {
    isAddMovieDialogVisible: false,
    isEditMovieDialogVisible: false,
    isDeleteMovieDialogVisible: false,
    editedMovieId: null,
    isMovieInfoMode: false,
    selectedMovieId: null
  },
  reducers: {
    dialogAddMovie: (state, action) => {
      state.isAddMovieDialogVisible = action.payload === "open";
    },
    dialogEditMovie: (state, action) => {
      let payload = action.payload;
      state.isEditMovieDialogVisible = payload.operation === "open";
      state.editedMovieId = payload.operation === "open" ? payload.id : null;
    },
    dialogDeleteMovie: (state, action) => {
      let payload = action.payload;
      state.isDeleteMovieDialogVisible = payload.operation === "open";
      state.editedMovieId = payload.operation === "open" ? payload.id : null;
    },
    infoMode: (state, action) => {
      let payload = action.payload;
      state.isMovieInfoMode = payload.mode === "on";
      state.selectedMovieId = payload.mode === "on" ? payload.id : null;
    }
  }
});
// action creators
export const {
  dialogAddMovie,
  dialogEditMovie,
  dialogDeleteMovie,
  infoMode
} = dialogsSlice.actions;

// selectors
export const selectIsAddMovieDialogVisible = (state) =>
  state.dialogs.isAddMovieDialogVisible;
export const selectIsEditMovieDialogVisible = (state) =>
  state.dialogs.isEditMovieDialogVisible;
export const selectIsDeleteMovieDialogVisible = (state) =>
  state.dialogs.isDeleteMovieDialogVisible;
export const selectEditedMovieId = (state) => state.dialogs.editedMovieId;
export const selectIsMovieInfoMode = (state) => state.dialogs.isMovieInfoMode;
export const selectSelectedMovieId = (state) => state.dialogs.selectedMovieId;

export default dialogsSlice.reducer;
