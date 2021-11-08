import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import { firestore } from "./firebase";
import { useEffect } from "react";
let App = () => {
	useEffect(() => {
		// add  -> collection is not present it will create the collection on it's own
		// firestore.collection("users").add({body:"value4"})


		//get means query by COMPLETE COLLECTION
		// firestore.collection("users").get() ==> it is promise based function

		async function f() {
			let querySnapshot = await firestore.collection("users").get();

			// querySnapshot.docs gives object of document

			for (let i = 0; i < querySnapshot.docs.length; i++) {
				console.log(querySnapshot.docs[i].data());
			}
		}
		f();
	}, []);
	return (
		<>
			<h1>App</h1>

			{/* <AuthProvider>
				<Router>
					<Switch>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/">
							<Home />
						</Route>
					</Switch>
				</Router>
			</AuthProvider> */}
		</>
	);
};

export default App;
