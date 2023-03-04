import React, { useState, useEffect } from "react";
import styles from "../Main/styles.module.css";
import MovieList from "../MoviesList";
import SearchBox from "../SearchBox";
import axios from "axios";
import { render } from "@testing-library/react";
import Spinner from "react-spinkit";

const Movie = () => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = React.useState(true);

  const token = localStorage.getItem("token");
  const headers = {
    authorization: token,
  };

  useEffect(() => {
    getDetails();
  }, [1]);

  const getDetails = async () => {
    setLoading(true);
    await axios.get("/favorite", { headers }).then((response) => {
      setFavourites(response.data);
    });

    await axios.get("/favoritepvt", { headers }).then((response) => {
      setPrivate(response.data.private);
      setuserID(response.data.id);
    });
    await axios.get("/selfplaylist/getlist", { headers }).then((response) => {
      setPlaylist(response.data);
    });
    setLoading(false);
  };

  const [favourites, setFavourites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  async function addToPlaylist(movie) {
    await axios.put("/favoriteadd", movie, { headers });
  }

  async function removeFromPlaylist(movie) {
    await axios.put("/favoritedel", movie, { headers });
  }

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    addToPlaylist(movie);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    removeFromPlaylist(movie);
  };

  const [privat, setPrivate] = useState(true);
  const [userid, setuserID] = useState("");

  async function prvt() {
    await axios.put("/favoritepvt", privat, { headers }).then((response) => {
      setPrivate(response.data.private);
      setuserID(response.data.id);
    });
  }

  function copy(value) {
    navigator.clipboard.writeText(value);
  }

  console.log("rendering");

  return loading ? (
    <Spinner
      name="double-bounce"
      className="spinner"
      style={{ width: 100, height: 100 }}
    />
  ) : (
    <div className={styles.main_container}>
      <div className={styles.search_things}>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className={styles.list_row}>
        <div className={styles.movies_row}>
          <MovieList
            // noplaylist={true}
            movies={movies}
            handleFavouritesClick={addFavouriteMovie}
            heart={false}
          />
        </div>
      </div>
      <div>
        <h1 className={styles.fav_head}>Liked</h1>
      </div>
      <div className={styles.list_row}>
        <div className={styles.movies_row}>
          <MovieList
            // noplaylist={false}
            movies={favourites}
            handleFavouritesClick={removeFavouriteMovie}
            heart={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Movie;
