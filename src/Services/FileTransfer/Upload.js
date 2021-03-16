import SetUploadDownloadProgress from '@/Store/UploadDownloadProgress/SetUploadDownloadProgress'
import { PostNewFileService } from '@/Services/Server'
import { ReadFileService } from '@/Services/FileSystem'
import { UploadFileService } from '@/Services/Device'

const checkError = (error, dispatch) => {
    if (error !== '') {
        dispatch(SetUploadDownloadProgress.action({ progress: 1, statusMessage: error, timeRemainingMsg: 'done', indeterminate: false}));
        return true;
    }

    return false;
}

export default async (dispatch, fileUri, fileName) => {
    // Obtain file from filesystem 
    dispatch(SetUploadDownloadProgress.action({ progress: 0, statusMessage: 'obtaining file data', timeRemainingMsg: 'tbd', indeterminate: true}));
    const fileData = await ReadFileService(fileUri);

    if (checkError(fileData[1], dispatch))
        return;

    // Create new file entry in database
    dispatch(SetUploadDownloadProgress.action({ progress: 0, statusMessage: 'contacting servers', timeRemainingMsg: 'tbd', indeterminate: true}));
    const fileId = await PostNewFileService(fileName);
    
    if (checkError(fileId[1], dispatch))
        return;

    // Send request to DE1 to upload data
    dispatch(SetUploadDownloadProgress.action({ progress: 0, statusMessage: 'uploading file', timeRemainingMsg: 'tbd', indeterminate: true}));
    const error = await UploadFileService(dispatch, fileId[0], fileData[0]);
    
    if (checkError(error, dispatch))
        return;
    
    dispatch(SetUploadDownloadProgress.action({ progress: 1, statusMessage: 'file upload successful', timeRemainingMsg: 'done', indeterminate: false}));
}
