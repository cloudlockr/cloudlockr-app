import SetUploadDownloadProgress from '@/Store/FileTransfer/SetUploadDownloadProgress'
import { ProcessSaveFileService } from '@/Services/FileSystem'
import { DownloadFileService } from '@/Services/Device'

export default async (dispatch, fileId, fileName) => {
    try {
        // Download file from DE1
        dispatch(SetUploadDownloadProgress.action({ progress: 0, statusMessage: 'requesting file download', timeRemainingMsg: 'tbd', indeterminate: true}));
        const fileData = await DownloadFileService(dispatch, fileId);

        // Process file data and save to device
        dispatch(SetUploadDownloadProgress.action({ progress: 0.95, statusMessage: 'processing and saving file', timeRemainingMsg: 'almost done', indeterminate: false}));
        await ProcessSaveFileService(fileData, fileName);

        // Display the download complete message
        dispatch(SetUploadDownloadProgress.action({ progress: 1, statusMessage: 'file download successful', timeRemainingMsg: 'done', indeterminate: false}));
    } catch (err) {
        // Display failure
        dispatch(SetUploadDownloadProgress.action({ progress: 1, statusMessage: 'file download failed', timeRemainingMsg: 'done', indeterminate: false}));
    }
}
