import GithubActions from "../redux/github";
import { call, put } from "redux-saga/effects";

export function* searchRepo(api, action) {
  const response = yield call(api.getRepo, action.reponame);
  if (response.ok) {
    yield put(GithubActions.searchRepoSuccess(response.data));
  }
}

export function* searchUser(api, action) {
  const response = yield call(api.getUser, action.username);
  if (response.ok) {
    yield put(GithubActions.searchUserSuccess(response.data));
  }
}
