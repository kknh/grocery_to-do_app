import React, { useState, useRef, useEffect } from 'react'
import './Main.css'
import List from './List'
import Alert from './Alert'
import { v4 as uuidv4 } from 'uuid'

function Main() {
	const [title, setTitle] = useState('')
	const [items, setItems] = useState(
		JSON.parse(localStorage.getItem('items')) || []
	)
	const [editing, setEditing] = useState(false)
	const [editingItem, setEditingItem] = useState({})

	const [alert, setAlert] = useState({
		isAlert: false,
		type: '',
		message: '',
	})

	const inputRef = useRef()

	const triggerAlert = (type, message) => {
		setAlert({
			isAlert: true,
			type: type,
			message: message,
		})
	}

	const removeAlert = () => {
		setAlert({
			isAlert: false,
			type: '',
			message: '',
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (title.trim().length === 0) {
			triggerAlert('danger', 'item title must be at least 1 character long')
			return
		}

		const item = {
			id: uuidv4(),
			title,
		}

		setItems([...items, item])

		localStorage.setItem('items', JSON.stringify([...items, item]))

		setTitle('')

		triggerAlert('success', 'item added to list')
	}

	const handleEdit = (e) => {
		e.preventDefault()
		const editedItem = {
			id: editingItem.id,
			title,
		}
		const editedItems = items.map((item) => {
			if (item.id === editedItem.id) {
				return editedItem
			} else {
				return item
			}
		})

		//set to state
		setItems(editedItems)

		//set to local storage
		localStorage.setItem('items', JSON.stringify(editedItems))

		setTitle('')
		setEditing(false)

		triggerAlert('success', 'item is edited')
	}

	const clearItems = () => {
		setItems([])
		localStorage.removeItem('items')

		triggerAlert('danger', 'items cleared')
	}

	const deleteItem = (id) => {
		const editedItems = items.filter((item) => item.id !== id)
		setItems(editedItems)
		if (items.length > 0) {
			localStorage.setItem('items', JSON.stringify(editedItems))
		} else {
			localStorage.removeItem('items')
		}

		triggerAlert('danger', 'item is deleted')
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
				{alert.isAlert && (
					<Alert
						type={alert.type}
						message={alert.message}
						removeAlert={removeAlert}
						items={items}
					/>
				)}
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
