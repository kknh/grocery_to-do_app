const mainReducer = (state, action) => {
	switch (action.type) {
		case 'SET_TITLE':
			return {
				...state,
				title: action.payload,
			}
		case 'HANDLE_SUBMIT':
			return {
				...state,
				items: [...state.items, action.payload],
				title: '',
			}
		case 'HANDLE_EDIT':
			return {
				...state,
				items: [
					...state.items.filter((item) => item.id !== state.editingItem.id),
					action.payload,
				],
				title: '',
				editing: false,
			}
		case 'CLEAR_ITEMS':
			return {
				...state,
				items: [],
			}
		case 'DELETE_ITEM':
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload),
			}
		case 'EDIT_ITEM':
			return {
				...state,
				editing: true,
				title: action.payload.title,
				editingItem: action.payload,
			}
		default:
			return state
	}
}

export default mainReducer
