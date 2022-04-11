import TodoActions from "../redux/todo"
import { call, put } from "redux-saga/effects"

export function* getDashboard(api, action) {
	const response = yield call(api.getDashboard, action)
	if (response.ok) {
		yield put(TodoActions.getDashboardSuccess(response.data))
	}
}

export function* getTasks(api, action) {
	const response = yield call(api.getTasks, action)
	if (response.ok) {
		yield put(TodoActions.getTasksSuccess(response.data.tasks))
	}
}

export function* createTask(api, action) {
	const response = yield call(api.createTask, action)
	if (response.ok) {
		yield put(TodoActions.createTaskSuccess(response.data))
	}
}

export function* deleteTask(api, action) {
	const response = yield call(api.deleteTask, action)
	if (response.ok) {
		yield put(TodoActions.deleteTaskSuccess())
	}
}

export function* updateTask(api, action) {
	const response = yield call(api.updateTask, action)
	if (response.ok) {
		yield put(TodoActions.updateTaskSuccess())
	}
}
