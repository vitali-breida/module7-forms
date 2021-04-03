import AddMovieButton from "../../Components/AddMovieButton/AddMovieButton";
import Search from "../../Components/Search/Search";
import MovieInfo from "../../Components/MovieInfo/MovieInfo";
import Logo from "../../Components/Logo/Logo";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "../../Components/SearchIcon/SearchIcon";
import { useSelector } from "react-redux";
import { selectIsMovieInfoMode } from "../../../features/dialogs/dialogsSlice";

export default function Header(props) {
  const isInfoMode = useSelector(selectIsMovieInfoMode);

  if (isInfoMode) {
    return (
      <>
        <Grid container>
          <Grid item xs={10}>
            <Logo />
          </Grid>
          <Grid item={2}>
            <SearchIcon />
          </Grid>
        </Grid>
        <MovieInfo />
      </>
    );
  } else
    return (
      <>
        <Logo />
        <AddMovieButton />
        <Search />
      </>
    );
}
