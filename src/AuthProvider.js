import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";

export const authContext = createContext();

let AuthProvider = (props) => {
	let [user, setUser] = useState(null);
	let [loading, setLoading] = useState(true);

	useEffect(() => {
		// but in firebase onAuthStateChanged is subscription and ye auth.onAuthStateChanged() return karta hain ek function jo unscubsribe hota matlab ki maine jo event lgaya hain mere app par hata do by calling unsub function
		let unsub = auth.onAuthStateChanged((user) => {
			if (user) {
				let { displayName, email, photoURL, uid } = user;
				setUser({ displayName, email, photoURL, uid });
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => {
			unsub();
		};
	}, []);
	return (
		<>
			<authContext.Provider value={user}>
				{/* props object hamare pass hota and uske andhar ek property hain child jo ki apne child btata hain */}
				{!loading && props.children}
			</authContext.Provider>
		</>
	);
};

export default AuthProvider;
