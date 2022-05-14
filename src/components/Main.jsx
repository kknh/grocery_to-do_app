//todo

// alert
// localstorage

import React, { useState, useRef } from 'react'
import './Main.css'
import List from './List'

import { v4 as uuidv4 } from 'uuid'

function Main() {
	const [title, setTitle] = useState('')
	const [items, setItems] = useState([])
	const [editing, setEditing] = useState(false)
	const [editingItem, setEditingItem] = useState({})

	const inputRef = useRef()

	const handleSubmit = (e) => {
		e.preventDefault()
		const item = {
			id: uuidv4(),
			title,
		}
		setItems((prevItems) => [...prevItems, item])
		setTitle('')
	}

	const handleEdit = (e) => {
		e.preventDefault()
		const editedItem = {
			id: editingItem.id,
			title,
		}
		setItems((prevItems) => [
			...prevItems.filter((item) => item.id !== editingItem.id),
			editedItem,
		])
		setTitle('')
		setEditing(false)
	}

	const clearItems = () => {
		setItems([])
	}

	const deleteItem = (id) => {
		setItems((prevItems) => prevItems.filter((item) => item.id !== id))
	}

	const editItem = (item) => {
		setEditing(true)
		setTitle(item.title)
		setEditingItem(item)
		inputRef.current.focus()
	}

	const submitButton = !editing ? (
		<button className="btn" type="submit">
			submit
		</button>
	) : (
		<button className="btn" type="submit">
			edit
		</button>
	)

	return (
		<div className="todo">
			<div className="todoContainer">
				<h1 className="todoTitle">grocery bud</h1>
				<form
					className="todoForm"
					onSubmit={!editing ? handleSubmit : handleEdit}
				>
					<input
						className="todoInput"
						type="text"
						value={title}
						ref={inputRef}
						placeholder="e.g. eggs"
						onChange={(e) => setTitle(e.target.value)}
					/>
					{submitButton}
				</form>
				{items.length > 0 && (
					<List
						items={items}
						clearItems={clearItems}
						deleteItem={deleteItem}
						editItem={editItem}
					/>
				)}
			</div>
		</div>
	)
}
export default Main
