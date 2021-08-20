import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { 
    LOAD_SESSION_FAILURE, 
    LOAD_SESSION_REQUEST, 
    LOAD_SESSION_SUCCESS, 
    UPLOAD_SESSION_FAILURE, 
    UPLOAD_SESSION_REQUEST, 
    UPLOAD_SESSION_SUCCESS,
} from '../reducers/session';

function uploadSessionAPI(data) {
  return axios.post('/api/sessions/create', data);
}

function* uploadSession(action) {
  try {
    const result = yield call(uploadSessionAPI, action.data);
    console.log(result);
    yield put({
      type: UPLOAD_SESSION_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_SESSION_FAILURE,
      error: err.response.data,
    });
  }
}

function loadSessionAPI(data) {
  return axios.get(`/api/sessions_by_name?name=${data}`);
}

function* loadSession(action) {
  try {
    const result = yield call(loadSessionAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_SESSION_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SESSION_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUploadSession() {
  yield takeLatest(UPLOAD_SESSION_REQUEST, uploadSession);
}

function* watchLoadSession() {
  yield takeLatest(LOAD_SESSION_REQUEST, loadSession);
}

export default function* userSaga() {
  yield all([
    fork(watchUploadSession),
    fork(watchLoadSession),
  ]);
}
