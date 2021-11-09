import { auth } from "../firebase";
import { authContext } from "../AuthProvider";
import { useContext } from "react";
import { Redirect } from "react-router";
import "./home.css";
import VideoCard from "./videoCard";

let Home = () => {
	let user = useContext(authContext);
	return (
		<>
			{user ? "" : <Redirect to="/login" />}
			<div className="video-container">
				<VideoCard />
				
			</div>
			<button
				className="home-logout-btn"
				onClick={() => {
					// jo bhi method se signin kara usko call karke logout kardega/signout ho jaega
					auth.signOut();
				}}
			>
				Logout
			</button>
		</>
	);
};

export default Home;
