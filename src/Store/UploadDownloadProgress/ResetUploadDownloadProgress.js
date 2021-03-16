import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('uploadDownloadProgress/reset'),
  reducers(state) {
    state.progress = 0;
    state.statusMessage = 'initializing';
    state.timeRemainingMsg = 'tbd';
    state.indeterminate = true;
  },
}
