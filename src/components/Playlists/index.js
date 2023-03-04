import React, { useState, useEffect } from "react";
import styles from "../Main/styles.module.css";
import axios from "axios";
import MovieList from "../MoviesList";
import Spinner from "react-spinkit";

import "./index.css";

const PlaylistPage = () => {
  const token = localStorage.getItem("token");
  const headers = {
    authorization: token,
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.replace("/");
  };
  const [loading, setLoading] = React.useState(false);

  const [movies, setMovies] = React.useState([]);
  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    setLoading(true);
    await axios
      .get("/selfplaylist/movieslist", { headers })
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      });
  };
  function copy(value) {
    navigator.clipboard.writeText(value);
  }
  // const [privat, setPrivate] = useState(false);
  // const [playlistid, setPlaylistid] = useState('');

  // function prvt(playlistid, status) {
  //     axios.put('./selfplaylist/private', { playlistid: playlistid, private: status }, { headers }).then((response) => {
  //         console.log(response.data.private)
  //         // setPlaylistid(response.data.id);
  //     });
  // }

  const Privatebody = (props) => {
    const [privt, setPrivt] = useState(props.private);

    const privatefun = async (playid, status) => {
      setPrivt(!status);

      await axios.put("./selfplaylist/private", {
        playlistid: playid,
        private: status,
      });
    };
    // setPlaylistid(response.data.id);

    const deleteplaylist = async (playid) => {
      console.log("trying to delete");
      setLoading(true);
      await axios
        .post("./selfplaylist/delplaylist", { playlistid: playid }, { headers })
        .then((res) => setLoading(false));
      getMovies();
    };
    return (
      <div className={styles.prvt_head}>
        <div>
          <button
            className={styles.white_btn}
            onClick={() => deleteplaylist(props.id)}
          >
            Delete
          </button>
          <button
            className={styles.white_btn}
            onClick={() => privatefun(props.id, privt)}
          >
            {privt ? "Public" : "Private"}{" "}
          </button>
          {!privt && (
            <button
              className={styles.copy_button}
              onClick={() =>
                copy(window.location.origin + `/playlistuser/` + props.id)
              }
            >
              CLICK TO COPY LINK
            </button>
          )}
        </div>
      </div>
    );
  };

  const handleRemoveFromPlaylist = (item) => {
    // console.log(item, movies);
    // setMovies((playlists) => {
    //   let temp = playlists.map((playlist) => {
    //     if (item.playid === playlist._id) {
    //       let movies = playlist.playlist.filter(
    //         (movie) => JSON.stringify(movie) !== JSON.stringify(item.movie)
    //       );
    //       return { ...playlist, playlist: movies };
    //     }
    //     return { ...playlist };
    //   });
    //   return temp;
    // });
    // getMovies();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Movies App</h1>
        <div>
          <button
            className={styles.white_btn}
            onClick={() => window.location.replace("./")}
          >
            Home
          </button>
          <button className={styles.white_btn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      {loading ? (
        <Spinner
          name="double-bounce"
          className="spinner"
          style={{ width: 100, height: 100 }}
        />
      ) : (
        movies.map((item) => (
          <>
            <h1 className="heading_playlist">{item.name}</h1>
            <div className={styles.options_playlist}>
              <Privatebody
                id={item._id}
                value={item.value}
                name={item.name}
                private={item.private}
              />
            </div>
            <div className={styles.list_row}>
              <div className={styles.movies_row}>
                {
                  <MovieList
                    playlistid={item._id}
                    movies={item.playlist}
                    handleFavouritesClick={() => {}}
                    heart={false}
                    handleRemoveFromPlaylist={handleRemoveFromPlaylist}
                  />
                }
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
};

export default PlaylistPage;
