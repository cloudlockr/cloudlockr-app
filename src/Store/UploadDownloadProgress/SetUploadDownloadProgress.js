import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('uploadDownloadProgress/set'),
  reducers(state, { payload }) {
    state.progress = payload.progress;
    state.statusMessage = payload.statusMessage;
    state.timeRemainingMsg = payload.timeRemainingMsg;
    state.indeterminate = payload.indeterminate;
  },
}
