import { useContext, useEffect, useState } from "react";
import { firestore } from "../firebase";
import { authContext } from "../AuthProvider";
import "./videoCard.css";

let VideoCard = (props) => {
	let [playing, setPlaying] = useState(false);
	let [commentBoxOpen, setCommentBoxOpen] = useState(false);
	let [currUserComment, setCurrUserComment] = useState("");
	let [comments, setComments] = useState([]);
	let user = useContext(authContext);

	let currUserLiked;
	if (user) {
		currUserLiked = props.data.likes.includes(user.uid);
	}

	useEffect(() => {
		//making comment Arr
		let f = async () => {
			let commentsArr = props.data.comments;

			let arr = [];

			for (let i = 0; i < commentsArr.length; i++) {
				let commentDoc = await firestore
					.collection("comments")
					.doc(commentsArr[i])
					.get();

				arr.push(commentDoc.data());
			}

			setComments(arr);
		};
		f();
	}, [props]);

	//intersection observer API

	let callback = (entries) => {
		entries.forEach((entry) => {
			let ele = entry.target;
			console.log(ele);
			console.log(entry.isIntersecting);
			if (!entry.isIntersecting) {
				ele.pause();
			} else {
				ele.play();
			}
		});
	};

	let observer = new IntersectionObserver(callback, { threshold: 0.6 });

	useEffect(() => {
		let elements = document.querySelectorAll(".video-card-video");

		elements.forEach((el) => {
			observer.observe(el);
		});

		return () => {
			observer.disconnect();
		};
	}, [props]);

	return (
		<div className="video-card">
			<p className="video-card-username">{props.data.name}</p>
			<span className="video-card-music">
				<span class="material-icons-outlined">music_note</span>
				<marquee>some song</marquee>
			</span>
			<span
				onClick={(e) => {
					// e.stopPropagation() -> to stop bubbling
					if (commentBoxOpen) {
						setCommentBoxOpen(false);
					} else {
						setCommentBoxOpen(true);
					}
				}}
				class="material-icons-outlined video-card-comment"
			>
				chat
			</span>
			<span
				//toggle like button
				onClick={async () => {
					let likesArr = props.data.likes;

					if (currUserLiked) {
						likesArr = likesArr.filter((el) => {
							return el != user.uid;
						});
					} else {
						likesArr.push(user.uid);
					}

					await firestore
						.collection("posts")
						.doc(props.data.id)
						.update({ likes: likesArr });
				}}
				class="material-icons-outlined video-card-like"
			>
				{currUserLiked ? "favorite" : "favorite_border"}
			</span>
			{commentBoxOpen ? (
				<div className="video-card-comment-box">
					<div className="actual-comments">
						{comments.map((el) => {
							return (
								<div className="post-user-comment">
									<img src={el.photo} />
									<div>
										<h5>{el.name}</h5>
										<p>{el.comment}</p>
									</div>
								</div>
							);
						})}
					</div>
					<div className="comment-form">
						{/* jobhi mai input tag me likhunga wo meri state me save hota rahega */}
						<input
							type="text"
							value={currUserComment}
							onChange={(e) => {
								setCurrUserComment(e.currentTarget.value);
							}}
						/>
						<button
							onClick={async () => {
								//jo current comment state me hain use comments collection me add kr rha hu
								let docRef = await firestore.collection("comments").add({
									name: user.displayName,
									photo: user.photoURL,
									comment: currUserComment,
								});

								setCurrUserComment("");
								//to jo abhi maine add kra hain uske document ke ref se wo comment ka document nikal lo
								let doc = await docRef.get();
								//us document ki id nikal lo
								let commentId = doc.id;

								//ye jo video card hai uska post document nikalo
								let postDoc = await firestore
									.collection("posts")
									.doc(props.data.id)
									.get();
								// us document me comment array hai whapr jo apne apni comment add kra h uski id insert krdo
								let postCommentArr = postDoc.data().comments;

								postCommentArr.push(commentId);

								//ab ye comments array firestore jakr update krdo
								await firestore
									.collection("posts")
									.doc(props.data.id)
									.update({ comments: postCommentArr });
							}}
						>
							Post
						</button>
					</div>
				</div>
			) : (
				""
			)}
			<video
				onClick={(e) => {
					if (playing) {
						e.currentTarget.pause();
						setPlaying(false);
					} else {
						e.currentTarget.play();
						setPlaying(true);
					}
				}}
				loop
				src={props.data.url}
				className="video-card-video"
				muted="muted"
			></video>
		</div>
	);
};
export default VideoCard;
