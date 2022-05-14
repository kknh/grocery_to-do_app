import React from 'react'
import './List.css'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ items, clearItems, deleteItem, editItem }) => {
	return (
		<div className="list">
			{items &&
				items.map((item) => (
					<div className="listItem" key={item.id}>
						<span className="listItemTitle">{item.title}</span>
						<div className="listItemButtons">
							<FaEdit className="editBtn" onClick={() => editItem(item)} />
							<FaTrash
								className="deleteBtn"
								onClick={() => deleteItem(item.id)}
							/>
						</div>
					</div>
				))}

			<button className="clearBtn" onClick={clearItems}>
				clear items
			</button>
		</div>
	)
}

export default List
