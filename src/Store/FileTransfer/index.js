import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import SetUploadDownloadProgress from '@/Store/FileTransfer/SetUploadDownloadProgress'
import ResetUploadDownloadProgress from '@/Store/FileTransfer/ResetUploadDownloadProgress'
import SetDetails from '@/Store/FileTransfer/SetDetails'

export default buildSlice('fileTransfer', [SetDetails, SetUploadDownloadProgress, ResetUploadDownloadProgress], {
  details : {},
  progress: {
    progress: 0,
    statusMessage: 'initializing',
    timeRemainingMsg: 'tbd',
    indeterminate: true
  }
}).reducer
