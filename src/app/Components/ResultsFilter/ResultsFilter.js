import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  filterMovies,
  skipFiltering
} from "../../../features/movies/moviesSlice";

let filters = ["Documentary", "Comedy", "Horror", "Crime"];
export default function ResultsFilter() {
  const dispatch = useDispatch();
  const filterBy = useSelector((state) => state.movies.filterBy);

  const handleClickAll = (e) => {
    dispatch(skipFiltering());
    dispatch(fetchMovies());
  };

  const handleClickFilter = (e, filter) => {
    dispatch(filterMovies(filter));
    dispatch(fetchMovies());
  };

  return (
    <FormGroup row>
      <FormControlLabel
        checked={filterBy.length === 0}
        disabled={filterBy.length === 0}
        control={<Switch name="All" onChange={handleClickAll}></Switch>}
        label="All"
      />
      {filters.map((filter) => (
        <FormControlLabel
          control={
            <Switch
              key={filter}
              checked={filterBy.includes(filter)}
              name={filter}
              onChange={(e) => handleClickFilter(e, filter)}
            ></Switch>
          }
          label={filter}
          key={filter}
        />
      ))}
    </FormGroup>
  );
}
