import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";

function SubjectForm() {
	let params = useParams();
	const data = localStorage.getItem("userData");
	const token = JSON.parse(data).token;
	const URL = process.env.REACT_APP_URL;
	const { user, setUser } = useContext(UserContext);
	const [title, setTitle] = useState("");

	function createSubject(e) {
		e.preventDefault();
		axios
			.post(
				`${URL}subjects/${user.id}/new`,
				{
					title,
					ownerId: params.id,
				},
				{
					headers: {
						"x-access-token": token,
					},
				}
			)
			.then((res) => {
				window.location.reload();
			});
	}
	return (
		<div>
			<form onSubmit={createSubject}>
				<input
					type="text"
					placeholder="Subject name..."
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>
				<button type="submit">Add Subject</button>
			</form>
		</div>
	);
}

export default SubjectForm;
