import AuthActions from "../redux/auth"
import { call, put } from "redux-saga/effects"

export function* login(api, action) {
	const response = yield call(api.login, action)
	if (response.ok) {
		yield call(api.setHeaders, response.data.token.token)
		yield put(AuthActions.loginSuccess(response.data))
	}
}
