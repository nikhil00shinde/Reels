import { auth, storage, firestore } from "../firebase";
import { authContext } from "../AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import "./home.css";
import VideoCard from "./videoCard";

let Home = () => {
	let user = useContext(authContext);
	let [posts, setPosts] = useState([]);

	useEffect(() => {
		//    agar jab bhi hum update karte hain collection mei toh fir real time update hota hain
		// ki agar kuch update hooya database mei toh fir sare client ko event and woh hamare UI update kar dega

		// agar database mei kuch update hota hain toh ye function chala dena
		let unsub = firestore.collection("posts").onSnapshot((querySnapshot) => {
			let docArr = querySnapshot.docs;

			let arr = [];

			for (let i = 0; i < docArr.length; i++) {
				arr.push({ id: docArr[i].id, ...docArr[i].data() });
			}

			setPosts(arr);
		});

		return () => {
			unsub();
		};
	}, []);

	return (
		<>
			{user ? "" : <Redirect to="/login" />}
			<div className="video-container">
				{posts.map((el) => {
					return <VideoCard key={el.id} data={el} />;
				})}
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

						uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
							// console.log(url);

							await firestore.collection("posts").add({
								name: user.displayName,
								url,
								likes: [],
								comments: [],
							});
						});
					});
				}}
			/>
		</>
	);
};

export default Home;
