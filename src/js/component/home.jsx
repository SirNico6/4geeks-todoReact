import React from "react";
import { useState, useEffect } from "react";
import "../../styles/index.css"

const Home = () => {
	const [taskList, setTaskList] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const baseURL = "https://playground.4geeks.com/todo/";
	const myUser = "nicoarevalo3";

	useEffect(() => {
		createUser();
	}, []);

	const createUser = async () => {
		try {
			const response = await fetch(baseURL + "users/" + myUser, { method: 'POST' });
			if (!response.ok) {
				if (response.status === 400) {
					console.log("user already exist, executing get tasks!")
					getTasks();
					return;
				} else {
					alert("Something went wrong, try again later");
				}
			}
		} catch (error) {
			console.error("Error creating user:", error);
		}
	}


	const addTask = async (e) => {
		if (e.key === 'Enter' && inputValue.trim() !== "") {
			await fetch(baseURL + "todos/" + myUser, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"label": inputValue,
					"is_done": false
				})
			})
				.then(response => {
					getTasks();
					return response.json()
				})
				.catch(error => {
					console.error(error)
				});
			setInputValue("");
		}
	};

	const getTasks = async () => {
		setTaskList([]);
		await fetch(baseURL + "users/" + myUser, { method: 'GET' })
			.then(response => {
				if (response.status == 404) {
					createUser();
				}
				return response.json()
			})
			.then(data => {
				data.todos.forEach(element => {
					setTaskList(prevTaskList => [...prevTaskList, element]);
				});
			})
			.catch(error => {
				if (response.status == 404) {
					createUser();
				} else {
					console.error(error);
				}
			});
	}

	const deleteTask = async (task) => {
		await fetch(baseURL + "todos/" + task.id, { method: 'DELETE' })
			.then(response => {
				getTasks();
			})
			.catch(error => console.error(error));
	};

	return (
		<div className="d-flex flex-column justify-content-center align-items-center vh-100">
			<h3 className="title">TODOS</h3>
			<input
				type="text"
				onChange={e => setInputValue(e.target.value)}
				value={inputValue}
				onKeyDown={addTask}
				className="form-control mb-3 input"
				placeholder="What needs to be done?"
			/>
			{taskList.length > 0 ? (
				<>
					<ul className="list-group w-25 taskList">
						{taskList.map((task) => (
							<li className="list-group-item d-flex justify-content-between align-items-center" key={task.id} style={{ border: 'none', borderBottom: '1px solid #e0e0e0' }}>
								<span>{task.label}</span>
								<button type="button" className="btn-close" aria-label="Close" onClick={() => deleteTask(task)}></button>
							</li>
						))}
					</ul>
					<small className="text-muted">
						{taskList.length} item{taskList.length !== 1 ? 's' : ''} left
					</small>
				</>
			) : (
				<p className="text-muted">No tasks, add a task</p>
			)}
		</div>
	);
};

export default Home;
