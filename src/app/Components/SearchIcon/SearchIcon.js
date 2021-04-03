import SearchIconMUI from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { infoMode } from "../../../features/dialogs/dialogsSlice";

export default function SearchIcon(props) {
  const dispatch = useDispatch();

  return (
    <SearchIconMUI onClick={(e) => dispatch(infoMode({ mode: "off" }))}>
      search
    </SearchIconMUI>
  );
}
