import MovieCard from "../MovieCard/MovieCard";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { useSelector } from "react-redux";

export default function ResultsBody(props) {
  const movies = useSelector((state) => state.movies.list);

  return (
    <GridList cellHeight="auto" cols={3}>
      {movies.map((movie) => (
        <GridListTile key={movie.title}>
          <MovieCard
            movieId={movie.id}
            title={movie.title}
            genres={movie.genres}
            releaseDate={movie.release_date}
            imageUrl={movie.poster_path}
          />
        </GridListTile>
      ))}
    </GridList>
  );
}
