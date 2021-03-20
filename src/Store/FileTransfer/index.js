import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import initialState from '@/Store/initialState'
import SetUploadDownloadProgress from '@/Store/FileTransfer/SetUploadDownloadProgress'
import ResetUploadDownloadProgress from '@/Store/FileTransfer/ResetUploadDownloadProgress'
import SetDetails from '@/Store/FileTransfer/SetDetails'

export default buildSlice('fileTransfer', [SetDetails, SetUploadDownloadProgress, ResetUploadDownloadProgress], {
  details : initialState.fileTransfer.details,
  progress: initialState.fileTransfer.progress
}).reducer
