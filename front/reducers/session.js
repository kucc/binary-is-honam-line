/* eslint-disable no-param-reassign */
import produce from '../util/produce';

export const initialState = {
    uploadSessionLoading: false,
    uploadSessionDone: false,
    uploadSessionError: false,
    loadSessionLoading: false,
    loadSessionDone: false,
    loadSessionError: false,
    sessionData: null,
};

export const UPLOAD_SESSION_REQUEST = 'UPLOAD_SESSION_REQUEST';
export const UPLOAD_SESSION_SUCCESS = 'UPLOAD_SESSION_SUCCESS';
export const UPLOAD_SESSION_FAILURE = 'UPLOAD_SESSION_FAILURE';

export const LOAD_SESSION_REQUEST = 'LOAD_SESSION_REQUEST';
export const LOAD_SESSION_SUCCESS = 'LOAD_SESSION_SUCCESS';
export const LOAD_SESSION_FAILURE = 'LOAD_SESSION_FAILURE';

export const SessionNameAction = (data) => ({
  type: UPLOAD_SESSION_REQUEST,
  data,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case UPLOAD_SESSION_REQUEST:
      draft.uploadSessoinLoading = true;
      draft.uploadSessionError = null;
      draft.uploadSessionDone = false;
      break;
    case UPLOAD_SESSION_SUCCESS:
      draft.uploadSessionLoading = false;
      draft.sessionData = action.data;
      draft.uploadSessionDone = true;
      break;
    case UPLOAD_SESSION_FAILURE:
      draft.uploadSessionLoading = false;
      draft.uploadSessionError = action.error;
      break;          
    default:
      break;
  }
});

export default reducer;
