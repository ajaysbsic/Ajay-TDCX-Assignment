import { all, takeLatest } from "redux-saga/effects"

// Saga files
import { searchRepo, searchUser } from "./github"
import { login } from "./auth"
import { getDashboard, getTasks, createTask, deleteTask, updateTask } from "./todo"

// Redux file
import { GithubTypes } from "../redux/github"
import { AuthTypes } from "../redux/auth"
import { TodoTypes } from "../redux/todo"

import API from "../utils/api"

const api = API.create()

export default function* rootSaga() {
	yield all([
		takeLatest(GithubTypes.SEARCH_REPO, searchRepo, api),
		takeLatest(GithubTypes.SEARCH_USER, searchUser, api),
		takeLatest(AuthTypes.LOGIN, login, api),
		takeLatest(TodoTypes.GET_DASHBOARD, getDashboard, api),
		takeLatest(TodoTypes.GET_TASKS, getTasks, api),
		takeLatest(TodoTypes.CREATE_TASK, createTask, api),
		takeLatest(TodoTypes.DELETE_TASK, deleteTask, api),
		takeLatest(TodoTypes.UPDATE_TASK, updateTask, api),
	])
}
