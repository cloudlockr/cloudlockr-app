import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('fileTransfer/progress/set'),
  reducers(state, { payload }) {
    state.progress.progress = payload.progress;
    state.progress.statusMessage = payload.statusMessage.toLowerCase();
    state.progress.timeRemainingMsg = payload.timeRemainingMsg;
    state.progress.indeterminate = payload.indeterminate;
  },
}
