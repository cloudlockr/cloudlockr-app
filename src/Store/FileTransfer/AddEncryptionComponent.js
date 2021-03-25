import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('fileTransfer/addEncryptionComponent'),
  reducers(state, { payload }) {
    state.encryptionComponents[payload.fileId] = payload.value;
  },
}
