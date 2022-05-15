import React, { useEffect } from 'react'
import styled from 'styled-components'

function Alert({ type, message, removeAlert, items }) {
	useEffect(() => {
		const clear = setTimeout(() => {
			removeAlert()
		}, 3000)

		return () => clearTimeout(clear)
	}, [removeAlert, items])

	return <AlertStyled type={type}>{message}</AlertStyled>
}

const AlertStyled = styled.div`
	width: 100%;
	height: 1.3rem;
	border-radius: 3px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.8rem;
	margin-bottom: 10px;
	text-transform: capitalize;
	background-color: ${(props) =>
		props.type === 'danger'
			? '#f8d7da'
			: props.type === 'success'
			? '#d4edda'
			: '#fff'};
	color: ${(props) =>
		props.type === 'danger'
			? '#721c24'
			: props.type === 'success'
			? '#155724'
			: '#000'}; ;
`
export default Alert
