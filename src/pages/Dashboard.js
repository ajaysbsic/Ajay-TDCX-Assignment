import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TodoActions from "../redux/todo"
import AuthActions from "../redux/auth"
import styled from "styled-components"
import { Flex, Box } from "../components"
import { TrashIcon, PencilIcon } from "../components/icons"
import { Modal } from "@material-ui/core"
import { PieChart } from "react-minimal-pie-chart"

const Container = styled.div`
	background-color: #f4f4f6;
	min-height: 100vh;
	width: 100%;
`
const Header = styled(Flex)`
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 6px #00000029;
	opacity: 1;
`

const Card = styled(Box)`
	min-height: 158px;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 6px #0000000a;
	opacity: 1;
	margin: 8px 0px 0px 0px;
	border-radius: 12px;
`
const CardContent = styled.div`
	padding: 24px;
`

const CardContentTaskList = styled.div`
	min-height: 75px;
	border-bottom: 1px solid #e8e8e8;
	margin-left: 16px;
	align-items: center;
	display: flex;
`

const Input = styled.input`
	padding: 12px;
	margin: 4px 0px;
	background: #d9dfeb;
	border: none;
	border-radius: 8px;
	width: 244px;
	font-size: 14px;
	text-align: center;
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
	margin: none;
`

const ModalContainer = styled(Box)`
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 6px #00000029;
	border-radius: 12px;
	opacity: 1;
`

const CompletedText = styled(Box)`
	text-decoration: line-through;
`

const Dashboard = () => {
	const dispatch = useDispatch()

	const { dataDashboard, taskLists } = useSelector((state) => state.todo)
	const { data } = useSelector((state) => state.auth)

	const [showModal, setShowModal] = useState(false)
	const [modalType, setModalType] = useState("new")
	const [taskName, setTaskName] = useState("")
	const [editId, setEditId] = useState("")
	const [editName, setEditName] = useState("")
	const [filteredTaskLists, setFilteredTaskLists] = useState([])

	// eslint-disable-next-line
	useEffect(() => {
		dispatch(TodoActions.getDashboard())
		setFilteredTaskLists(taskLists)
	}, [taskLists])

	// eslint-disable-next-line
	useEffect(() => {
		dispatch(TodoActions.getTasks())
		if (dataDashboard.totalTasks <= 0) {
			setShowModal(true)
		}
	}, [dataDashboard.totalTasks])

	const handleClickModal = () => {
		setShowModal(true)
	}

	const submitNewTask = () => {
		setShowModal(false)
		dispatch(TodoActions.createTask(taskName))
	}

	const filterTaskList = (e) => {
		if (e.target.value.length > 2) {
			const newData = filteredTaskLists.filter((a) =>
				a.name.toLowerCase().includes(e.target.value.toLowerCase())
			)
			setFilteredTaskLists(newData)
		} else {
			setFilteredTaskLists(taskLists)
		}
	}

	const clickEdit = (id, name) => {
		setModalType("edit")
		setEditId(id)
		setEditName(name)
		setShowModal(true)
	}

	const submitEditTask = () => {
		dispatch(TodoActions.updateTask({ id: editId, name: editName }))
		setModalType("new")
		setShowModal(false)
	}

	return (
		<Container>
			<Header
				bg='#FFFFFF'
				height={72}
				display='flex'
				flexDirection='row'
				px={[0, 128]}
				alignItems='center'
				justifyContent='space-between'
			>
				<Box pl={["24px", "0px"]}>{data.name}</Box>
				<Box
					pr={["24px", "0px"]}
					style={{ cursor: "pointer" }}
					onClick={() => dispatch(AuthActions.reset())}
				>
					Logout
				</Box>
			</Header>
			<>
				<Flex
					display='flex'
					flexDirection={["column", "column", "row"]}
					justifyContent='space-between'
					px={[0, 128]}
				>
					<Card width={[1, 1, 0.3]}>
						<CardContent>
							<span style={{ fontSize: 20, color: "#537178" }}>Task Completed</span>
							<div style={{ fontSize: 20 }}>
								<span style={{ fontSize: 64, color: "#5285EC" }}>
									{dataDashboard.tasksCompleted && dataDashboard.tasksCompleted}
								</span>{" "}
								{dataDashboard.totalTasks && `/ ${dataDashboard.totalTasks}`}
							</div>
						</CardContent>
					</Card>
					<Card width={[1, 1, 0.3]}>
						<CardContent>
							<span style={{ fontSize: 20, color: "#537178" }}>Latest Task Created</span>
							<ul style={{ paddingLeft: 24 }}>
								{dataDashboard.latestTasks &&
									dataDashboard.latestTasks.map((i, idx) => {
										if (i.completed) {
											return (
												<CompletedText
													key={idx}
													color='#537178'
													textDecorationLine='line-through'
													fontSize={14}
												>
													<li>{i.name}</li>
												</CompletedText>
											)
										} else {
											return (
												<li key={idx} style={{ fontSize: 14, color: "#8F9EA2" }}>
													{i.name}
												</li>
											)
										}
									})}
							</ul>
						</CardContent>
					</Card>
					<Card width={[1, 1, 0.3]}>
						<CardContent>
							<PieChart
								style={{ height: "100px" }}
								data={[
									{
										title: "Completed",
										value: dataDashboard.tasksCompleted,
										color: "#5285EC",
									},
									{
										title: "Not Completed",
										value: dataDashboard.totalTasks - dataDashboard.tasksCompleted,
										color: "#E8ECEC",
									},
								]}
							/>
						</CardContent>
					</Card>
				</Flex>
				<Flex
					pt={2}
					px={[0, 128]}
					alignItems='center'
					justifyContent={["center", "flex-end"]}
					display='flex'
					flexDirection={["column", "row"]}
				>
					<Input placeholder='Search Task by Name' onChange={(e) => filterTaskList(e)} />
					<Button onClick={() => setShowModal(true)}>+ New Task</Button>
				</Flex>
				<Flex px={[0, 128]} pb={4}>
					<Card>
						{filteredTaskLists ? (
							filteredTaskLists.map((i, idx) => {
								return (
									<CardContentTaskList key={idx}>
										<Box width={[0.1, 0.05]}>
											<input
												type='checkbox'
												checked={i.completed}
												onChange={() =>
													dispatch(
														TodoActions.updateTask({
															completed: !i.completed,
															id: i._id,
														})
													)
												}
											/>
										</Box>
										{i.completed ? (
											<CompletedText
												width={[0.75, 0.8]}
												fontSize={20}
												color='#537178'
												textDecorationLine='line-through'
											>
												{i.name}
											</CompletedText>
										) : (
											<Box width={[0.75, 0.8]} fontSize={20} color='#5285EC'>
												{i.name}
											</Box>
										)}
										<Box
											width={0.15}
											display='flex'
											justifyContent='center'
											alignItems='center'
											pt={3}
										>
											<Box onClick={() => clickEdit(i._id, i.name)} style={{ cursor: "pointer" }}>
												<PencilIcon width={30} height={30} />
											</Box>
											<Box
												onClick={() => dispatch(TodoActions.deleteTask(i._id))}
												style={{ cursor: "pointer" }}
											>
												<TrashIcon width={30} height={30} />
											</Box>
										</Box>
									</CardContentTaskList>
								)
							})
						) : (
							<CardContentTaskList>No task found</CardContentTaskList>
						)}
					</Card>
				</Flex>
			</>
			<Modal open={showModal} onClose={handleClickModal}>
				{modalType === "new" ? (
					<Box
						width={1}
						height={"100vh"}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<ModalContainer width={300} bg='white' px={4} py={4}>
							<div>+ New Task</div>
							<Input
								style={{ marginTop: 32, width: 276 }}
								placeholder='Task Name'
								onChange={(e) => setTaskName(e.target.value)}
							/>
							<Button
								style={{ marginLeft: 0, marginRight: 0, width: "100%" }}
								onClick={() => submitNewTask()}
							>
								+ New Task
							</Button>
						</ModalContainer>
					</Box>
				) : (
					<Box
						width={1}
						height={"100vh"}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<ModalContainer width={300} bg='white' px={4} py={4}>
							<div>Edit Task</div>
							<Input
								style={{ marginTop: 32, width: 276 }}
								value={editName}
								onChange={(e) => setEditName(e.target.value)}
							/>
							<Button
								style={{ marginLeft: 0, marginRight: 0, width: "100%" }}
								onClick={() => submitEditTask()}
							>
								Edit Task
							</Button>
						</ModalContainer>
					</Box>
				)}
			</Modal>
		</Container>
	)
}

export default Dashboard
