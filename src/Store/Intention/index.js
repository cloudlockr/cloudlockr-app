import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import SetIntention from '@/Store/Intention/SetIntention'

export default buildSlice('intention', [SetIntention], {
  intention: {},
}).reducer
