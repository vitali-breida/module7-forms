import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
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
import { useFormik } from "formik";
import { validationSchema } from "../../yup";

export default function EditMovieDialog() {
  const isEditMovieDialogVisible = useSelector(selectIsEditMovieDialogVisible);
  const movie = useSelector(selectEditedMovie);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: !!movie ? movie.title : "",
      movieUrl: !!movie ? movie.movieUrl : "",
      overview: !!movie ? movie.overview : "",
      runtime: !!movie ? movie.runtime : 90,
      releaseDate: !!movie ? movie.release_date : "2014-03-11",
      genres: !!movie ? movie.genres : []
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(
          editMovie({
            id: movie.id,
            tagline: movie.tagline,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            budget: movie.budget,
            revenue: movie.revenue,
            genres: values.genres,
            title: values.title,
            release_date: values.releaseDate,
            poster_path: values.movieUrl,
            overview: values.overview,
            runtime: parseInt(values.runtime, 10)
          })
        );
        unwrapResult(resultAction);
        handleClose();
      } catch (err) {
        alert("Failed to edit a movie: " + err.message);
      }
    }
  });

  useEffect(() => {
    if (!!movie) {
      formik.setValues({
        title: movie.title,
        movieUrl: movie.poster_path,
        overview: movie.overview,
        runtime: movie.runtime,
        releaseDate: movie.release_date,
        genres: movie.genres
      });
    }
  }, [movie]);

  function handleClose(e) {
    dispatch(dialogEditMovie("close"));
  }

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
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
