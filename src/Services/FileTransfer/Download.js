import SetUploadDownloadProgress from '@/Store/FileTransfer/SetUploadDownloadProgress'
import { ProcessSaveFileService } from '@/Services/FileSystem'
import { DownloadFileService } from '@/Services/Device'

export default async (dispatch, fileId, fileName, localEncrpytionComponent, userEmail) => {
    try {
        // Download file from DE1
        dispatch(SetUploadDownloadProgress.action({ progress: 0, statusMessage: 'Requesting file download', timeRemainingMsg: 'tbd', indeterminate: true}));
        const fileData = await DownloadFileService(dispatch, fileId, localEncrpytionComponent, userEmail);

        // Process file data and save to device
        dispatch(SetUploadDownloadProgress.action({ progress: 0.95, statusMessage: 'Processing and saving file', timeRemainingMsg: 'almost done', indeterminate: false}));
        await ProcessSaveFileService(fileData, fileName);

        // Display the download complete message
        dispatch(SetUploadDownloadProgress.action({ progress: 1, statusMessage: 'File download successful', timeRemainingMsg: 'done', indeterminate: false}));
    } catch (err) {
        // Display failure
        dispatch(SetUploadDownloadProgress.action({ progress: 1, statusMessage: 'File download failed. ' + err, timeRemainingMsg: 'failed', indeterminate: false}));
    }
}
