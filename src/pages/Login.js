import React, { useState } from "react"
import { useDispatch } from "react-redux"
import AuthActions from "../redux/auth"
import styled from "styled-components"
import { Box } from "../components"

const Container = styled.div`
	min-height: 100vh;
	align-items: center;
	justify-content: center;
	display: flex;
	background-color: #f4f4f6;
`

const Card = styled(Box)`
	border-radius: 15px;
	box-shadow: 0px 3px 6px #00000029;
`

const Input = styled.input`
	padding: 12px;
	margin: 4px 0px;
	background: #eef1f8;
	border: none;
	border-radius: 8px;
	width: 244px;
	font-size: 14px;
`

const Button = styled.button`
	background-color: #5285ec;
	color: #ffffff;
	font-size: 14px;
	margin: 12px;
	padding: 12px;
	border: none;
	border-radius: 8px;
	width: 270px;
	height: 40px;
	cursor: pointer;
`

const Login = () => {
	const [id, setId] = useState("")
	const [name, setName] = useState("")
	const dispatch = useDispatch()

	return (
		<Container>
			<Card
				height={250}
				width={300}
				alignItems='center'
				justifyContent='center'
				flexDirection='column'
				display='flex'
				bg='white'
			>
				<Box fontSize={20} textAlign='left' width={1} ml={24} mb={12}>
					Login
				</Box>
				<Input placeholder='Name' name='name' onChange={(e) => setId(e.target.value)} />
				<Input placeholder='ApiKey' name='id' onChange={(e) => setName(e.target.value)} />
				<Button onClick={() => dispatch(AuthActions.login(id, name))}>Login</Button>
			</Card>
		</Container>
	)
}

export default Login
