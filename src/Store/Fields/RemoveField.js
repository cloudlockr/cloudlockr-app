import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('fields/removeField'),
  reducers(state, { payload }) {
    // Remove the object field if it currently being stored
    for (var key in Object.keys(state.fields)) {
      if (key === payload.id) {
        delete state.fields[payload.id];
        break;
      }
    }
  },
}
