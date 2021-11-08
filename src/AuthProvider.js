import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "./firebase";

export const authContext = createContext();

let AuthProvider = (props) => {
	let [user, setUser] = useState(null);
	let [loading, setLoading] = useState(true);

	useEffect(() => {
		// but in firebase onAuthStateChanged is subscription and ye auth.onAuthStateChanged() return karta hain ek function jo unscubsribe hota matlab ki maine jo event lgaya hain mere app par hata do by calling unsub function
		let unsub = auth.onAuthStateChanged(async (user) => {
			if (user) {
				let { displayName, email, photoURL, uid } = user;

				// agar uid present nhi hain collectioj mei toh fake document create karta
				// fake document hamara collection mei nhi hota
				let docRef = firestore.collection("users").doc(uid);

				let documentSnapshot = await docRef.get();

				if (!documentSnapshot.exists) {
					// agar hum fake document mei set karte hain, toh phir voh ek actual document bn jata hain
					docRef.set({ displayName, email, photoURL });
				}

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
