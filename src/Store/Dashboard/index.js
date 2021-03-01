import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import SetDownloadInfo from '@/Store/Dashboard/SetDownloadInfo'

export default buildSlice('dashboard', [SetDownloadInfo], {
  downloadInfo: {},
}).reducer
