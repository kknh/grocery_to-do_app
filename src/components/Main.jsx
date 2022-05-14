//todo

// alert
// localstorage

import React, { useReducer, useRef } from 'react'
import './Main.css'
import List from './List'
import mainReducer from './mainReducer'
import { v4 as uuidv4 } from 'uuid'

function Main() {
	const initialState = {
		title: '',
		items: [],
		editing: false,
		editingItem: {},
	}

	const [state, dispatch] = useReducer(mainReducer, initialState)

	// const [title, setTitle] = useState('')
	// const [items, setItems] = useState([])
	// const [editing, setEditing] = useState(false)
	// const [editingItem, setEditingItem] = useState({})

	const inputRef = useRef()

	const handleSubmit = (e) => {
		e.preventDefault()
		const item = {
			id: uuidv4(),
			title: state.title,
		}
		// setItems((prevItems) => [...prevItems, item])
		// setTitle('')
		dispatch({ type: 'HANDLE_SUBMIT', payload: item })
	}

	const handleEdit = (e) => {
		e.preventDefault()
		const editedItem = {
			id: state.editingItem.id,
			title: state.title,
		}
		dispatch({ type: 'HANDLE_EDIT', payload: editedItem })
		// setItems((prevItems) => [
		// 	...prevItems.filter((item) => item.id !== editingItem.id),
		// 	editedItem,
		// ])
		// setTitle('')
		// setEditing(false)
	}

	const clearItems = () => {
		dispatch({ type: 'CLEAR_ITEMS' })
	}

	const deleteItem = (id) => {
		dispatch({ type: 'DELETE_ITEM', payload: id })
		//setItems((prevItems) => prevItems.filter((item) => item.id !== id))
	}

	const editItem = (item) => {
		dispatch({ type: 'EDIT_ITEM', payload: item })
		//setEditing(true)
		//setTitle(item.title)
		//setEditingItem(item)
		inputRef.current.focus()
	}

	const submitButton = !state.editing ? (
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
					onSubmit={!state.editing ? handleSubmit : handleEdit}
				>
					<input
						className="todoInput"
						type="text"
						value={state.title}
						ref={inputRef}
						placeholder="e.g. eggs"
						onChange={(e) =>
							dispatch({ type: 'SET_TITLE', payload: e.target.value })
						}
					/>
					{submitButton}
				</form>
				{state.items.length > 0 && (
					<List
						items={state.items}
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
