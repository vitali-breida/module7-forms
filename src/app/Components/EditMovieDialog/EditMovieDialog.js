import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import {
  selectIsEditMovieDialogVisible,
  dialogEditMovie
} from "../../../features/dialogs/dialogsSlice";
import {
  selectEditedMovie,
  editMovie
} from "../../../features/movies/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

export default function EditMovieDialog(props) {
  const isEditMovieDialogVisible = useSelector(selectIsEditMovieDialogVisible);
  const movie = useSelector(selectEditedMovie);

  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [overview, setOverview] = useState("");
  const [runtime, setRuntime] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!movie) {
      setTitle(movie.title);
      setPosterPath(movie.poster_path);
      setOverview(movie.overview);
      setRuntime(movie.runtime);
      setReleaseDate(movie.release_date);
    }
  }, [movie]);

  function handleClose(e) {
    dispatch(dialogEditMovie("close"));
  }

  const handleSubmit = async (e) => {
    try {
      const resultAction = await dispatch(
        editMovie({
          id: movie.id,
          tagline: movie.tagline,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          budget: movie.budget,
          revenue: movie.revenue,
          genres: movie.genres,

          title: title,
          release_date: releaseDate,
          poster_path: posterPath,
          overview: overview,
          runtime: parseInt(runtime, 10)
        })
      );
      unwrapResult(resultAction);
      handleClose(e);
    } catch (err) {
      alert("Failed to edit a movie: " + err.message);
    }
  };

  return (
    <div>
      <Dialog
        open={isEditMovieDialogVisible}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">EDIT MOVIE</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              variant="outlined"
              fullWidth
              defaultValue={!!movie ? movie.title : ""}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              id="date"
              type="date"
              variant="outlined"
              fullWidth
              defaultValue={!!movie ? movie.release_date : ""}
              onChange={(e) => {
                setReleaseDate(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              id="movieUrl"
              label="Movie URL"
              type="url"
              variant="outlined"
              fullWidth
              defaultValue={!!movie ? movie.poster_path : ""}
              onChange={(e) => {
                setPosterPath(e.target.value);
              }}
            />
            <InputLabel>Genre</InputLabel>
            <Select
              margin="dense"
              label="Genre"
              variant="outlined"
              fullWidth
              //multiple
              value={1}
              // value={movie.genres}
            >
              <MenuItem value={0}>Comedy</MenuItem>
              <MenuItem value={1}>Drama</MenuItem>
              <MenuItem value={2}>Romance</MenuItem>
            </Select>
            <TextField
              margin="dense"
              id="overview"
              label="Overview"
              type="text"
              variant="outlined"
              placeholder="Overview text goes here"
              fullWidth
              defaultValue={!!movie ? movie.overview : ""}
              onChange={(e) => {
                setOverview(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              id="runtime"
              label="Runtime"
              type="text"
              variant="outlined"
              placeholder="Runtime text goes here"
              fullWidth
              defaultValue={!!movie ? movie.runtime : ""}
              onChange={(e) => {
                setRuntime(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Reset
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
