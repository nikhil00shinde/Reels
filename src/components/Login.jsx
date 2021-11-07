import { useContext } from "react";
import { signInWithGoogle } from "../firebase";
import { authContext } from "../AuthProvider";
import { Redirect } from "react-router-dom";
let Login = () => {
	let user = useContext(authContext);
	console.log(user);
	return (
		<>
			{user ? <Redirect to="/" /> : ""}
			<button
				onClick={() => {
					signInWithGoogle();
				}}
				type="button"
				class="btn btn-primary m-4"
			>
				Login to Google
			</button>
		</>
	);
};
export default Login;
