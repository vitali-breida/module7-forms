import PropTypes from "prop-types";

export default function MovieGenre(props) {
  if (!!props.genres) {
    return <div>{props.genres.join(" & ")}</div>;
  } else return null;
}

MovieGenre.propTypes = {
  genres: PropTypes.array
};
