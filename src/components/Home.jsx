import { auth, storage } from "../firebase";
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
			<input
				type="file"
				onChange={(e) => {
					let videoObj = e.currentTarget.files[0];

					let { name, type, size } = videoObj;

					size = size / 1000000;

					if (size > 10) {
						alert("file size exceeds 10mb");
						return;
					}

					type = type.split("/")[0];

					if (type !== "video") {
						alert("Please upload a video file");
						return;
					}

					//gives a event
					let uploadTask = storage
						.ref(`/posts/${user.uid}/${Date.now() + "-" + name}`)
						.put(videoObj);

					//uploadTask is event we apply listener to it
					uploadTask.on("state_changed", null, null, () => {
						// jb upload ho jati file hamare storage pe
						// tab ye function chalta hain

						uploadTask.snapshot.ref.getDownloadURL().then((url) => {
							console.log(url);
						});
					});
				}}
			/>
		</>
	);
};

export default Home;
