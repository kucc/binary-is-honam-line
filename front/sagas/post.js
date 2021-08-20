import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  LOAD_IMAGES_FAILURE,
  LOAD_IMAGES_REQUEST,
  LOAD_IMAGES_SUCCESS,
} from '../reducers/post';

// 얼굴 사진 업로드
function uploadImagesAPI(data) {
  return axios.post('/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
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

// 얼굴 사진 불러오기
function loadImagesAPI(data) {
  return axios.get(`/post/images/${data}`);
}

function* loadImages(action) {
  try {
    const result = yield call(loadImagesAPI, action.data);
    yield put({
      type: LOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUpLoadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchLoadImages() {
  yield takeLatest(LOAD_IMAGES_REQUEST, loadImages);
}

export default function* userSaga() {
  yield all([
    fork(watchUpLoadImages),
    fork(watchLoadImages),
  ]);
}
