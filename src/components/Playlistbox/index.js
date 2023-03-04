import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import playlisticon from "./images.png";
import addplaylist from "./images (1).png";
import Spinner from "react-spinkit";

const Playlistbox = (props) => {
  // header and token

  const token = localStorage.getItem("token");
  const headers = {
    authorization: token,
  };
  const [playlistdisplay, setPlaylistDisplay] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [playlists, setPlaylists] = React.useState([]);

  const [details, setDetails] = React.useState([]);

  useEffect(() => {
    setLoading(true);
    getDetails();
    getPlaylists();
    setLoading(false);
  }, [1]);

  const getDetails = async () => {
    setLoading(true);

    await axios.get("/selfplaylist/getlist", { headers }).then((response) => {
      setDetails(response.data);
      setLoading(false);
    });
  };
  const getPlaylists = async () => {
    setLoading(true);

    await axios
      .get("/selfplaylist/movieslist", { headers })
      .then((response) => {
        setPlaylists(response.data);
        setLoading(false);
      });
  };
  const checkInPlaylist = (id, check) => {
    if (check === false) {
      let bol;
      playlists.forEach((item) => {
        if (item._id === id) {
          bol = item.playlist.some(
            (movie) => movie.imdbID === props.movie.imdbID
          );
        }
      });
      return bol;
    }
  };

  const createplaylist = async (e) => {
    e.preventDefault();
    {
      document.getElementById("createplaylistname").value && setLoading(true);
      await axios
        .post(
          "selfplaylist/createplaylist",
          { name: document.getElementById("createplaylistname").value },
          { headers }
        )
        .then((res) => setLoading(false));
    }
    document.getElementById("createplaylistname").value = "";
    getDetails();
  };
  const Newlist = details.map((det) => (
    <div>
      {" "}
      <input
        type="checkbox"
        id={det.value}
        checked={checkInPlaylist(det.value, false) ? true : false}
        onChange={() => addorremove(det.value)}
      />
      <label className="inputplaylist">{det.label}</label>
    </div>
  ));

  const addorremove = async (id) => {
    console.log(document.getElementById(id).value);
    if (!document.getElementById(id).checked) {
      setLoading(true);

      await axios
        .post("selfplaylist/removefromplaylist", {
          playid: id,
          movie: props.movie,
        })
        .then((res) => setLoading(false));
      setChecked((i) => !i);
    } else {
      console.log({ playid: id, movie: props.movie }, "add");
      setLoading(true);
      await axios
        .put("selfplaylist/addtoplaylist", {
          playid: id,
          movie: props.movie,
        })
        .then((res) => setLoading(false));
      setChecked((i) => !i);
    }
    getPlaylists();
  };

  return (
    <div className="playlistbox">
      {playlistdisplay && (
        <form className="playlistlist" onSubmit={(e) => createplaylist(e)}>
          {/* <label for="username">Create Playlist</label>
                <div>
                <button className="createbutton" onClick={() => props.createplaylistto(document.getElementById("createplaylistname").value)}>Create.!</button>
            </div> */}
          <input
            className="createplaylisttype"
            type="text"
            id="createplaylistname"
          />
          <img
            className="playlistimgopen"
            onClick={(e) => createplaylist(e)}
            src={addplaylist}
          />
          <br></br>
          {loading ? (
            <Spinner
              name="double-bounce"
              className="spinner"
              style={{ width: 100, height: 100 }}
            />
          ) : (
            Newlist
          )}
        </form>
      )}

      <img
        className="playlistimgopen"
        onClick={() => {
          setPlaylistDisplay((bol) => !bol);
        }}
        src={playlisticon}
      />
    </div>
  );
};
export default Playlistbox;
