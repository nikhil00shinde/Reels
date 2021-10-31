import { useEffect } from "react";
import { signInWithGoogle, auth } from "../firebase";

let Login = () => {
	useEffect(() => {
		//   onAuthStateChanged ek event hain jo login/logout/signup ke baad chalta
		// ek baar toh chalta hain hamesha
		auth.onAuthStateChanged((user) => {
			console.log(user);
		});
	}, []);

	return (
		<>
			<button
				onClick={() => {
					signInWithGoogle();
				}}
				type="button"
				class="btn btn-primary m-4"
			>
				Login to Google
			</button>

			<button
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
export default Login;
