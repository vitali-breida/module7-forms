import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import store from "../../app/store";

//configuration
const serverUrl = "http://localhost:4000/movies";
const sortByDefault = "vote_average";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  let url = serverUrl;
  let state = store.getState();

  //sorting
  let sortBy = state.movies.sortBy;
  if (!sortBy) {
    sortBy = sortByDefault;
  }
  url += "?sortBy=" + sortBy + "&sortOrder=asc";

  //filtering
  let filterBy = state.movies.filterBy;
  if (filterBy.length > 0) {
    url += "&filter=" + filterBy.join("%2C");
  }

  // pagination
  url += "&offset=0&limit=6";

  const response = await fetch(url);
  const movies = response.json();
  return movies;
});

export const addMovie = createAsyncThunk("movies/addMovie", async (payload) => {
  const response = await fetch(serverUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const json = await response.json();
  if (!!json.messages) {
    throw new Error(json.messages);
  } else return json;
});

export const editMovie = createAsyncThunk(
  "movies/editMovie",
  async (payload) => {
    const response = await fetch(serverUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const json = await response.json();
    if (!!json.messages) {
      throw new Error(json.messages);
    } else return json;
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movieId) => {
    await fetch(serverUrl + "/" + movieId, {
      method: "DELETE"
    });
    return movieId;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    sortBy: sortByDefault,
    totalCount: 0,
    filterBy: []
  },
  reducers: {
    sortMovies: (state, action) => {
      state.sortBy = action.payload;
    },
    filterMovies: (state, action) => {
      let f = action.payload;

      if (state.filterBy.includes(f)) {
        state.filterBy = state.filterBy.filter((el) => {
          return el !== f;
        });
      } else {
        state.filterBy.push(f);
      }
    },
    skipFiltering: (state, action) => {
      state.filterBy = [];
    }
  },
  extraReducers: {
    [fetchMovies.fulfilled]: (state, action) => {
      state.list = action.payload.data;
      state.totalCount = action.payload.totalAmount;
    },
    [addMovie.fulfilled]: (state, action) => {
      state.list.push(action.payload);
    },
    [addMovie.rejected]: (state, action) => {
      console.log("Add movie is rejected: ", action.error.message);
    },
    [editMovie.fulfilled]: (state, action) => {
      let index = state.list.findIndex((el) => {
        return el.id === action.payload.id;
      });
      state.list[index] = action.payload;
    },
    [deleteMovie.fulfilled]: (state, action) => {
      state.list = state.list.filter((el) => {
        return el.id !== action.payload;
      });
    }
  }
});

// action creators
export const { sortMovies, filterMovies, skipFiltering } = moviesSlice.actions;

// Returns selected movie from the state
export const selectSelectedMovie = (state) =>
  state.movies.list.find((el) => {
    return el.id === state.dialogs.selectedMovieId;
  });

// Returns edited movie from the state
export const selectEditedMovie = (state) =>
  state.movies.list.find((el) => {
    return el.id === state.dialogs.editedMovieId;
  });

export const selectSortBy = (state) => state.movies.selectSortBy;

export default moviesSlice.reducer;
