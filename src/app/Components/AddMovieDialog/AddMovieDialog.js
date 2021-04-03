import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAddMovieDialogVisible,
  dialogAddMovie
} from "../../../features/dialogs/dialogsSlice";
import { addMovie } from "../../../features/movies/moviesSlice";

import { unwrapResult } from "@reduxjs/toolkit";

export default function AddMovieDialog(props) {
  const isAddMovieDialogVisible = useSelector(selectIsAddMovieDialogVisible);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [overview, setOverview] = useState("");
  const [runtime, setRuntime] = useState(90);
  const [releaseDate, setReleaseDate] = useState("");

  const handleClose = (e) => {
    dispatch(dialogAddMovie("close"));
  };

  const handleSubmit = async (e) => {
    try {
      const resultAction = await dispatch(
        addMovie({
          tagline: "Default tagline",
          genres: ["Drama"],
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
      alert("Failed to add a movie: " + err.message);
    }
  };
  return (
    <div>
      <Dialog
        open={isAddMovieDialogVisible}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">ADD MOVIE</DialogTitle>
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
              defaultValue={title}
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
              defautValue={releaseDate}
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
              defaultValue={posterPath}
              onChange={(e) => {
                setPosterPath(e.target.value);
              }}
            />
            <TextField
              select
              margin="dense"
              id="name"
              label="Genre"
              variant="outlined"
              fullWidth
              // defaultalue={1}
              value={2}
            >
              <MenuItem value={1}>Crime</MenuItem>
              <MenuItem value={2}>Documentary</MenuItem>
              <MenuItem value={3}>Horror</MenuItem>
              <MenuItem value={4}>Comedy</MenuItem>
            </TextField>
            <TextField
              margin="dense"
              id="overview"
              label="Overview"
              type="text"
              variant="outlined"
              placeholder="Overview text goes here"
              fullWidth
              defaultValue={overview}
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
              defaultValue={runtime}
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
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
