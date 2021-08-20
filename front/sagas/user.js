import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOAD_USERSLIST_SUCCESS,
  LOAD_USERSLIST_FAILURE,
  LOAD_USERSLIST_REQUEST,
} from '../reducers/user';

// 얼굴 사진 업로드
function uploadfaceimagesAPI(data) {
  return axios.post('/user/images', data);
}

function* uploadfaceimages(action) {
  try {
    const result = yield call(uploadfaceimagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

// 로그인
function logInAPI(data) {
  return axios.post('/api/users/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

// 로그아웃
function logOutAPI() {
  return axios.get('/api/users/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// 회원가입
function registerUserAPI(data) {
  return axios.post('/api/users/register', data);
}

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.data);
    console.log(result);
    yield put({
      type: REGISTER_USER_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REGISTER_USER_FAILURE,
      error: err.response.data,
    });
  }
}

// 유저 리스트 가져오기
function loadUsersListAPI(data) {
  return axios.get('/api/users/userList');
}

function* loadUsersList(action) {
  try {
    const result = yield call(loadUsersListAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_USERSLIST_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USERSLIST_FAILURE,
      error: err.response.data,
    });
  }
}

// 내 정보 불러오기
function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadUsersList() {
  yield takeLatest(LOAD_USERSLIST_REQUEST, loadUsersList);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchRegisterUser() {
  yield takeLatest(REGISTER_USER_REQUEST, registerUser);
}

function* watchUpLoadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadfaceimages);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadUsersList),
    fork(watchLoadMyInfo),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchRegisterUser),
    fork(watchUpLoadImages),
  ]);
}
