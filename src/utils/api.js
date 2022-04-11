import apisauce from "apisauce"

const create = () => {
	const apiTDCX = apisauce.create({
		baseURL: "https://dev-dl.tdcx.com:3092",
	})

	const login = (params) => {
		return apiTDCX.post(`/login`, JSON.stringify(params))
	}

	const setHeaders = (token) => {
		return apiTDCX.setHeader("Authorization", token)
	}

	const getDashboard = () => {
		return apiTDCX.get(`/dashboard`)
	}

	const getTasks = () => {
		return apiTDCX.get(`/tasks`)
	}

	const createTask = (params) => {
		return apiTDCX.post(`/tasks`, JSON.stringify(params))
	}

	const updateTask = (params) => {
		return apiTDCX.put(`/tasks/${params.payload.id}`, JSON.stringify(params.payload))
	}

	const deleteTask = (params) => {
		return apiTDCX.delete(`/tasks/${params.id}`)
	}

	return {
		login,
		setHeaders,
		getDashboard,
		getTasks,
		createTask,
		updateTask,
		deleteTask,
	}
}

export default { create }
