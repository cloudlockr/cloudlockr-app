import SetUploadDownloadProgress from '@/Store/FileTransfer/SetUploadDownloadProgress'
import { ProcessSaveFileService } from '@/Services/FileSystem'
import { DownloadFileService } from '@/Services/Device'

const checkError = (error, dispatch) => {
    if (error !== '') {
        dispatch(SetUploadDownloadProgress.action({ progress: 1, statusMessage: error, timeRemainingMsg: 'done', indeterminate: false}));
        return true;
    }

    return false;
}

export default async (dispatch, fileId, fileName) => {
    // Download file from DE1
    dispatch(SetUploadDownloadProgress.action({ progress: 0, statusMessage: 'requesting file download', timeRemainingMsg: 'tbd', indeterminate: true}));
    const fileData = await DownloadFileService(dispatch, fileId);

    if (checkError(fileData[1], dispatch))
        return;

    // Process file data and save to device
    dispatch(SetUploadDownloadProgress.action({ progress: 0.95, statusMessage: 'processing and saving file', timeRemainingMsg: 'almost done', indeterminate: false}));
    const error = await ProcessSaveFileService(fileData[0], fileName);
    
    if (checkError(error, dispatch))
        return;
    
    // Display the download complete message
    dispatch(SetUploadDownloadProgress.action({ progress: 1, statusMessage: 'file download successful', timeRemainingMsg: 'done', indeterminate: false}));
}
