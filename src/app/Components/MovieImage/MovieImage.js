import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  dialogDeleteMovie,
  dialogEditMovie,
  infoMode,
  selectIsMovieInfoMode,
  selectSelectedMovieId
} from "../../../features/dialogs/dialogsSlice";

export default function MovieImage(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const isInfoMode = useSelector(selectIsMovieInfoMode);
  const selectedMovieId = useSelector(selectSelectedMovieId);

  const showMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = (e) => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    if (!isInfoMode || props.movieId !== selectedMovieId) {
      dispatch(infoMode({ mode: "on", id: props.movieId }));
    } else {
      showMenu(e);
    }
  };

  const handleChooseEdit = (e) => {
    dispatch(dialogEditMovie({ operation: "open", id: props.movieId }));
    closeMenu(e);
  };

  const handleChooseDelete = (e) => {
    dispatch(dialogDeleteMovie({ operation: "open", id: props.movieId }));
    closeMenu(e);
  };

  return (
    <>
      <img
        alt="Poster"
        src={props.imageUrl}
        height="300"
        onClick={handleClick}
      />
      <Menu
        id="movie-context-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleChooseEdit}>Edit</MenuItem>
        <MenuItem onClick={handleChooseDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
}

MovieImage.propTypes = {
  movieId: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired
};
