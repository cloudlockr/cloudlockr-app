import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('fileTransfer/progress/reset'),
  reducers(state) {
    state.progress.progress = 0;
    state.progress.statusMessage = 'initializing';
    state.progress.timeRemainingMsg = 'tbd';
    state.progress.indeterminate = true;
  },
}
