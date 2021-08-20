/* eslint-disable no-param-reassign */
import produce from '../util/produce';

export const initialState = {
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  loadImagesLoading: false,
  loadImagesDone: false,
  loadImagesError: null,
  imagesData: null,
  imagePaths: [],
};

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LOAD_IMAGES_REQUEST = 'LOAD_IMAGES_REQUEST';
export const LOAD_IMAGES_SUCCESS = 'LOAD_IMAGES_SUCCESS';
export const LOAD_IMAGES_FAILURE = 'LOAD_IMAGES_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case REMOVE_IMAGE:
      // 서버에서는 이미지를 제거해주지 않고 프론트에서만 제거해줌
      draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
      break;
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesError = null;
      draft.uploadImagesDone = false;
      break;
    case LOAD_IMAGES_REQUEST:
      draft.loadImagesLoading = false;
      draft.imagesData = action.data;
      draft.loadImagesDone = true;
      break;
    default:
      break;
  }
});

export default reducer;
