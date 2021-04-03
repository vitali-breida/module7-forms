import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAddMovieDialogVisible,
  dialogAddMovie
} from "../../../features/dialogs/dialogsSlice";
import { addMovie } from "../../../features/movies/moviesSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import { FormControl, FormHelperText } from "@material-ui/core";
import { validationSchema } from "../../yup";

export default function AddMovieDialog(props) {
  const isAddMovieDialogVisible = useSelector(selectIsAddMovieDialogVisible);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      movieUrl: "",
      overview: "",
      runtime: 90,
      releaseDate: "2014-03-11",
      genres: ["Drama"]
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        const resultAction = await dispatch(
          addMovie({
            tagline: "Default tagline",
            genres: values.genres,
            title: values.title,
            release_date: values.releaseDate,
            poster_path: values.movieUrl,
            overview: values.overview,
            runtime: values.runtime
          })
        );
        unwrapResult(resultAction);
        handleClose();
      } catch (err) {
        alert("Failed to add a movie: " + err.message);
      }
    }
  });

  const handleClose = (e) => {
    dispatch(dialogAddMovie("close"));
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
              id="title"
              name="title"
              label="Title"
              placeholder="Enter title"
              type="text"
              variant="outlined"
              fullWidth
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              margin="dense"
              id="releaseDate"
              name="releaseDate"
              label="Release date"
              type="date"
              variant="outlined"
              fullWidth
              value={formik.values.releaseDate}
              onChange={formik.handleChange}
              error={
                formik.touched.releaseDate && Boolean(formik.errors.releaseDate)
              }
              helperText={
                formik.touched.releaseDate && formik.errors.releaseDate
              }
            />
            <TextField
              margin="dense"
              id="movieUrl"
              name="movieUrl"
              label="Movie URL"
              type="url"
              variant="outlined"
              fullWidth
              placeholder="Enter movie URL"
              value={formik.values.movieUrl}
              onChange={formik.handleChange}
              error={formik.touched.movieUrl && Boolean(formik.errors.movieUrl)}
              helperText={formik.touched.movieUrl && formik.errors.movieUrl}
            />
            <FormControl fullWidth>
              <Select
                margin="dense"
                id="genres"
                name="genres"
                variant="outlined"
                fullWidth
                multiple
                required
                value={formik.values.genres}
                onChange={formik.handleChange}
                error={formik.touched.genres && Boolean(formik.errors.genres)}
              >
                <MenuItem value="Action">Action</MenuItem>
                <MenuItem value="Adventure">Adventure</MenuItem>
                <MenuItem value="Animation">Animation</MenuItem>
                <MenuItem value="Drama">Drama</MenuItem>
                <MenuItem value="Comedy">Comedy</MenuItem>
                <MenuItem value="Crime">Crime</MenuItem>
                <MenuItem value="Documentary">Documentary</MenuItem>
                <MenuItem value="Fantasy">Fantasy</MenuItem>
                <MenuItem value="Family">Family</MenuItem>
                <MenuItem value="Horror">Horror</MenuItem>
                <MenuItem value="Romance">Romance</MenuItem>
                <MenuItem value="Science Fiction">Science Fiction</MenuItem>
                <MenuItem value="Thriller">Thriller</MenuItem>
                <MenuItem value="War">War</MenuItem>
              </Select>
              <FormHelperText
                error={formik.touched.genres && Boolean(formik.errors.genres)}
              >
                {formik.touched.genres && formik.errors.genres}
              </FormHelperText>
            </FormControl>

            <TextField
              margin="dense"
              id="overview"
              name="overview"
              label="Overview"
              type="text"
              variant="outlined"
              placeholder="Overview text goes here"
              fullWidth
              value={formik.values.overview}
              onChange={formik.handleChange}
              error={formik.touched.overview && Boolean(formik.errors.overview)}
              helperText={formik.touched.overview && formik.errors.overview}
            />
            <TextField
              margin="dense"
              id="runtime"
              name="runtime"
              label="Runtime"
              type="text"
              variant="outlined"
              placeholder="Runtime text goes here"
              fullWidth
              value={formik.values.runtime}
              onChange={formik.handleChange}
              error={formik.touched.runtime && Boolean(formik.errors.runtime)}
              helperText={formik.touched.runtime && formik.errors.runtime}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Reset
          </Button>
          <Button onClick={formik.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
