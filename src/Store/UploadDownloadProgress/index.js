import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import SetUploadDownloadProgress from '@/Store/UploadDownloadProgress/SetUploadDownloadProgress'
import ResetUploadDownloadProgress from '@/Store/UploadDownloadProgress/ResetUploadDownloadProgress'

export default buildSlice('uploadDownloadProgress', [SetUploadDownloadProgress, ResetUploadDownloadProgress], {
  progress: 0,
  statusMessage: 'initializing',
  timeRemainingMsg: 'tbd',
  indeterminate: true
}).reducer
