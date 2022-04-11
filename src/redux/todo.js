import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"

const { Types, Creators } = createActions({
	getDashboard: null,
	getDashboardSuccess: ["payload"],
	getDashboardFail: null,
	getTasks: null,
	getTasksSuccess: ["payload"],
	getTasksFail: null,
	createTask: ["name"],
	createTaskSuccess: ["payload"],
	createTaskFail: null,
	deleteTask: ["id"],
	deleteTaskSuccess: null,
	deleteTaskFail: null,
	updateTask: ["payload"],
	updateTaskSuccess: null,
	updateTaskFail: null,
})

export const TodoTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
	loading: false,
	dataDashboard: {},
	taskLists: [],
})

const getDashboard = (state, action) => {
	return state.merge({
		loading: true,
	})
}

const getDashboardSuccess = (state, action) => {
	return state.merge({
		loading: false,
		dataDashboard: { ...action.payload },
	})
}

const getDashboardFail = (state, action) => {
	return state.merge({
		loading: false,
	})
}

const getTasks = (state, action) => {
	return state.merge({
		loading: true,
	})
}

const getTasksSuccess = (state, action) => {
	return state.merge({
		loading: false,
		taskLists: action.payload,
	})
}

const getTasksFail = (state, action) => {
	return state.merge({
		loading: false,
	})
}

const createTask = (state, action) => {
	return state.merge({
		loading: true,
	})
}

const createTaskSuccess = (state, action) => {
	return state.merge({
		loading: false,
		taskLists: [...state.taskLists, action.payload.task],
	})
}

const createTaskFail = (state, action) => {
	return state.merge({
		loading: false,
	})
}

const deleteTask = (state, action) => {
	return state.merge({
		loading: true,
	})
}

const deleteTaskSuccess = (state, action) => {
	return state.merge({
		loading: false,
		dataDashboard: { ...state, totalTasks: state.totalTasks - 1 },
	})
}

const deleteTaskFail = (state, action) => {
	return state.merge({
		loading: false,
	})
}

const updateTask = (state, action) => {
	return state.merge({
		loading: true,
	})
}

const updateTaskSuccess = (state, action) => {
	return state.merge({
		loading: false,
		dataDashboard: { ...state, tasksCompleted: state.tasksCompleted },
	})
}

const updateTaskFail = (state, action) => {
	return state.merge({
		loading: false,
	})
}

export const todo = createReducer(INITIAL_STATE, {
	[Types.GET_DASHBOARD]: getDashboard,
	[Types.GET_DASHBOARD_SUCCESS]: getDashboardSuccess,
	[Types.GET_DASHBOARD_FAIL]: getDashboardFail,
	[Types.GET_TASKS]: getTasks,
	[Types.GET_TASKS_SUCCESS]: getTasksSuccess,
	[Types.GET_TASKS_FAIL]: getTasksFail,
	[Types.CREATE_TASK]: createTask,
	[Types.CREATE_TASK_SUCCESS]: createTaskSuccess,
	[Types.CREATE_TASK_FAIL]: createTaskFail,
	[Types.DELETE_TASK]: deleteTask,
	[Types.DELETE_TASK_SUCCESS]: deleteTaskSuccess,
	[Types.DELETE_TASK_FAIL]: deleteTaskFail,
	[Types.UPDATE_TASK]: updateTask,
	[Types.UPDATE_TASK_SUCCESS]: updateTaskSuccess,
	[Types.UPDATE_TASK_FAIL]: updateTaskFail,
})
