import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectSelectedMovie } from "../../../features/movies/moviesSlice";

export default function MovieInfo(props) {
  const movie = useSelector(selectSelectedMovie);

  if (!!movie) {
    return (
      <Grid container>
        <Grid item xs={2}>
          <img alt="Poster" src={movie.poster_path} height="180" />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={9}>
          {movie.title} {movie.vote_average} <br />
          {movie.genres.join(" ")} <br />
          {movie.release_date} {movie.runtime} <br />
          {movie.overview} <br />
        </Grid>
      </Grid>
    );
  } else return null;
}
