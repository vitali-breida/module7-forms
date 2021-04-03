//import "./styles.css";
import Header from "./app/Containers/Header/Header";
import Body from "./app/Containers/Body/Body";
import Footer from "./app/Containers/Footer/Footer";
import React from "react";
import AddMovieDialog from "./app/Components/AddMovieDialog/AddMovieDialog";
import EditMovieDialog from "./app/Components/EditMovieDialog/EditMovieDialog";
import DeleteMovieDialog from "./app/Components/DeleteMovieDialog/DeleteMovieDialog";

export default function App() {
  return (
    <>
      <Header />
      <Body />
      <Footer />

      <AddMovieDialog />
      <EditMovieDialog />
      <DeleteMovieDialog />
    </>
  );
}
