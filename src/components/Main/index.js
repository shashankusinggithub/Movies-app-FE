import styles from "./styles.module.css";
import Movie from "../Movie";


const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Movies App</h1>
				<div>
					<button className={styles.white_btn} onClick={()=>window.location.replace("./playlists")}>
						Playlist
					</button>
					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>
				</div>
			</nav>
			<Movie />
		</div>
	);
};

export default Main;