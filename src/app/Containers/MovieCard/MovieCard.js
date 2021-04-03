import MovieGenre from "../../Components/MovieGenre/MovieGenre";
import MovieImage from "../../Components/MovieImage/MovieImage";
import MovieReleaseDate from "../../Components/MovieReleaseDate/MovieReleaseDate";
import MovieTitle from "../../Components/MovieTitle/MovieTitle";
import PropTypes from "prop-types";

export default function MovieCard(props) {
  return (
    <>
      <MovieImage movieId={props.movieId} imageUrl={props.imageUrl} />
      <MovieTitle title={props.title} />
      <MovieGenre genres={props.genres} />
      <MovieReleaseDate releaseDate={props.releaseDate} />
    </>
  );
}

MovieCard.propTypes = {
  movieId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.array,
  imageUrl: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired
};

MovieCard.defaultProps = {
  imageUrl:
    "https://s1.livelib.ru/boocover/1000530481/o/10c8/Quentin_Tarantino__Pulp_Fiction_A_Quentin_Tarantino_Screenplay.jpeg"
};
