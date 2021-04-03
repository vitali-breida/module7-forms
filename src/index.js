import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";
import { fetchMovies } from "./features/movies/moviesSlice";

const rootElement = document.getElementById("root");

store.dispatch(fetchMovies());

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
