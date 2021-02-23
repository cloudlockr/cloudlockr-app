import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import SetField from '@/Store/Fields/SetField'
import RemoveField from '@/Store/Fields/RemoveField'

export default buildSlice('fields', [SetField, RemoveField], {
  fields: {},
}).reducer
