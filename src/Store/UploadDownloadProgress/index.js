import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import SetUploadDownloadProgress from '@/Store/UploadDownloadProgress/SetUploadDownloadProgress'

export default buildSlice('uploadDownloadProgress', [SetUploadDownloadProgress], {
  progress: 0,
  statusMessage: 'initializing',
  timeRemainingMsg: 'tbd',
  indeterminate: true
}).reducer
