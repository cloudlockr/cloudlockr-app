import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import initialState from '@/Store/initialState'
import SetIntention from '@/Store/Intention/SetIntention'

export default buildSlice('intention', [SetIntention], {
  intention: initialState.intention.intention,
}).reducer
