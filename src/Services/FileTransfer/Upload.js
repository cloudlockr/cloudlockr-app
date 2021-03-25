import SetUploadDownloadProgress from '@/Store/FileTransfer/SetUploadDownloadProgress'
import { PostNewFileService } from '@/Services/Server'
import { ReadFileService } from '@/Services/FileSystem'
import { UploadFileService } from '@/Services/Device'

export default async (dispatch, fileUri, fileName, userEmail) => {
    try {
        // Obtain file from filesystem 
        dispatch(SetUploadDownloadProgress.action({ progress: 0, statusMessage: 'Obtaining file data', timeRemainingMsg: 'tbd', indeterminate: true}));
        const fileDataBufferArray = await ReadFileService(fileUri);

        // Create new file entry in database
        dispatch(SetUploadDownloadProgress.action({ progress: 0, statusMessage: 'Contacting servers', timeRemainingMsg: 'tbd', indeterminate: true}));
        const fileId = await PostNewFileService(fileName);

        // Send request to DE1 to upload data
        dispatch(SetUploadDownloadProgress.action({ progress: 0, statusMessage: 'Uploading file', timeRemainingMsg: 'tbd', indeterminate: true}));
        await UploadFileService(dispatch, fileId, fileDataBufferArray, userEmail);
    
        dispatch(SetUploadDownloadProgress.action({ progress: 1, statusMessage: 'File upload successful', timeRemainingMsg: 'done', indeterminate: false}));
    } catch (err) {
        // Display failure
        dispatch(SetUploadDownloadProgress.action({ progress: 1, statusMessage: 'File upload failed. ' + err, timeRemainingMsg: 'failed', indeterminate: false}));
    }
}
