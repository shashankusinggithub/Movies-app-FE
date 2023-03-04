import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import heart from "./heart.png";
import Playlistbox from "../Playlistbox";
import removeitem from "./playlist-remove-512.webp";

const token = localStorage.getItem("token");
const headers = {
  authorization: token,
};

const MovieList = (props) => {
  const removefromplaylist = async (play, movie) => {
    // console.log("removvew ");
    await axios
      .post(
        "selfplaylist/removefromplaylist",
        { playid: props.playlistid, movie: movie },
        { headers }
      )
      .then((res) => {
        console.log(res);
        // setDetails((array) => array.filter((detail) => detail.movie != movie));
        props.handleRemoveFromPlaylist({
          playid: props.playlistid,
          movie: movie,
        });
      });
  };
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="container" key={index}>
          <h1>{movie.Title}</h1>
          <img className="imgg" src={movie.Poster} alt="movie"></img>
          <img
            key={index}
            onClick={
              props.handleFavouritesClick
                ? () => props.handleFavouritesClick(movie)
                : () => {}
            }
            alt="heart"
            className={!props.heart ? " heart " : "heart_full"}
            src={heart}
          />
          {props.handleFavouritesClick && (
            <Playlistbox playid={props.playlistid} movie={movie} />
          )}
          {props.playlistid && (
            <img
              src={removeitem}
              className="removeplaylist"
              onClick={() => removefromplaylist(props.playlistid, movie)}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default MovieList;
