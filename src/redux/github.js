import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
  searchRepo: ["reponame"],
  searchRepoSuccess: ["payload"],
  searchRepoFail: null,
  searchUser: ["username"],
  searchUserSuccess: ["payload"],
  searchUserFail: null
});

export const GithubTypes = Types;
export default Creators;

const INITIAL_STATE = Immutable({
  text: "Github Redux",
  reponame: "",
  username: "",
  data: [],
  repoList: [],
  userDetails: "",
  loading: false
});

const searchRepo = (state, { reponame }) => {
  return state.merge({
    loading: true,
    reponame
  });
};

const searchRepoSuccess = (state, action) => {
  return state.merge({
    repoList: action.payload.items,
    loading: false
  });
};

const searchRepoFail = (state, action) => {
  return state.merge({
    repoList: action.payload,
    loading: false
  });
};

const searchUser = (state, { username }) => {
  return state.merge({
    loading: true,
    username
  });
};

const searchUserSuccess = (state, action) => {
  return state.merge({
    userDetails: action.payload,
    loading: false
  });
};

const searchUserFail = (state, action) => {
  return state.merge({
    userDetails: action.payload,
    loading: false
  });
};

export const github = createReducer(INITIAL_STATE, {
  [Types.SEARCH_REPO]: searchRepo,
  [Types.SEARCH_REPO_SUCCESS]: searchRepoSuccess,
  [Types.SEARCH_REPO_FAIL]: searchRepoFail,
  [Types.SEARCH_USER]: searchUser,
  [Types.SEARCH_USER_SUCCESS]: searchUserSuccess,
  [Types.SEARCH_USER_FAIL]: searchUserFail
});
