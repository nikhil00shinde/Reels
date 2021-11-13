import { useContext } from "react";
import { authContext } from "../AuthProvider";
import "./Profile.css";
let Profile = () => {
	let user = useContext(authContext);
	return (
		<div className="profile-cont">
			<img src={user.photoURL} />
			<h1>{user.displayName}</h1>
		</div>
	);
};
export default Profile;
