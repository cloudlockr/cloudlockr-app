import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import SetDownloadClicked from '@/Store/Dashboard/SetDownloadClicked'
import SetDownloadInfo from '@/Store/Dashboard/SetDownloadInfo'

export default buildSlice('dashboard', [SetDownloadClicked, SetDownloadInfo], {
  downloadClicked: true,
  downloadInfo: {},
}).reducer
