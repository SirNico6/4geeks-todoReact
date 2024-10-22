import React from "react";
import { useState } from "react";
import "../../styles/index.css"

//create your first component
const Home = () => {
	const [taskList, setTaskList] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const addTask = (e) => {
		if (e.key === 'Enter' && inputValue.trim() !== "") {
			setTaskList([...taskList, inputValue]); // Agregar la nueva tarea al array
			setInputValue(""); // Limpiar el input
		}
	};

	const deleteTask = (index) => {
		// Elimina la tarea del taskList
		setTaskList(taskList.filter((_, i) => i !== index));
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
						{taskList.map((task, index) => (
							<li className="list-group-item d-flex justify-content-between align-items-center" key={index} style={{ border: 'none', borderBottom: '1px solid #e0e0e0' }}>
								<span>{task}</span>
								<button type="button" className="btn-close" aria-label="Close" onClick={() => deleteTask(index)}></button>
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
