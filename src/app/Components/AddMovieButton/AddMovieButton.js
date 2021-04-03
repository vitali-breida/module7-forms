import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { dialogAddMovie } from "../../../features/dialogs/dialogsSlice";

export default function AddMovieButton(props) {
  const dispatch = useDispatch();

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={() => dispatch(dialogAddMovie("open"))}>
          + Add movie
        </Button>
      </Box>
    </>
  );
}
