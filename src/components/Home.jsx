import { auth } from "../firebase";
import { authContext } from "../AuthProvider";
import { useContext } from "react";
import { Redirect } from "react-router";

let Home = () => {
	let user = useContext(authContext);
	return (
		<>
			{user ? "" : <Redirect to="/login" />}
			<h1>Home</h1>
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

export default Home;
