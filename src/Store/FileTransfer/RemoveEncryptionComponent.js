import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('fileTransfer/removeEncryptionComponent'),
  reducers(state, { payload }) {
    delete state.encryptionComponents[payload.fileId];
  },
}
