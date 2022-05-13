//todo
// buttons
// alert
// localstorage

import React, { useState } from 'react'
import './Main.css'
import List from './List'
import { v4 as uuidv4 } from 'uuid'

function Main() {
	const [title, setTitle] = useState('')
	const [items, setItems] = useState([])

	const handleSubmit = (e) => {
		e.preventDefault()
		const item = {
			id: uuidv4(),
			title,
		}
		setItems((prevItems) => [...prevItems, item])
		setTitle('')
	}

	const clearItems = () => {
		setItems([])
	}

	return (
		<div className="todo">
			<div className="todoContainer">
				{/* <Alert/> */}
				<h1 className="todoTitle">grocery bud</h1>
				<form className="todoForm" onSubmit={handleSubmit}>
					<input
						className="todoInput"
						type="text"
						value={title}
						placeholder="e.g. eggs"
						onChange={(e) => setTitle(e.target.value)}
					/>
					<button className="btn" type="submit">
						submit
					</button>
				</form>
				{items.length > 0 && <List items={items} clearItems={clearItems} />}
			</div>
		</div>
	)
}
export default Main
