import React, { useState, useEffect } from "react";
import styles from "../Main/styles.module.css";
import axios from "axios";
import MovieList from "../MoviesList";
import { useParams } from "react-router-dom"

const Dashboard = () => {
    const handleLogout = () => {
        // window.location.reload()
        window.location.replace('/');
    };

    const params = useParams().id

    const [details, setDetails] = React.useState([]);
    const [title, setTitle] = React.useState('');


    useEffect(() => {
        axios.get('/userplaylist/' + params).then((response) => {
            setDetails(response.data.playlist);
            setTitle(response.data.user)
        });
    }, []);

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Movies Fun</h1>
                <div>
                    <button className={styles.white_btn}
                        onClick={handleLogout}
                    >
                        Home
                    </button>
                </div>
            </nav>

            <h1 className={styles.fav_head} >{title}</h1>
            <div className={styles.list_row}>
                <div className={styles.movies_row}>
                    {details.map((movie, index) => (
                        <div className="container" key={index}>
                            <h1>{movie.Title}</h1>
                            <img
                                className="imgg"
                                src={movie.Poster}
                                alt='movie'></img>
                        </div>))}

                </div></div></div>
    );
};

export default Dashboard;