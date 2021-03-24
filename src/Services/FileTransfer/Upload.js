import SetUploadDownloadProgress from '@/Store/FileTransfer/SetUploadDownloadProgress'
import { PostNewFileService } from '@/Services/Server'
import { ReadFileService } from '@/Services/FileSystem'
import { UploadFileService } from '@/Services/Device'

export default async (dispatch, fileUri, fileName) => {
    try {
        // Obtain file from filesystem 
        dispatch(SetUploadDownloadProgress.action({ progress: 0, statusMessage: 'obtaining file data', timeRemainingMsg: 'tbd', indeterminate: true}));
        const fileData = await ReadFileService(fileUri);

        // Create new file entry in database
        dispatch(SetUploadDownloadProgress.action({ progress: 0, statusMessage: 'contacting servers', timeRemainingMsg: 'tbd', indeterminate: true}));
        const fileId = await PostNewFileService(fileName);

        // Send request to DE1 to upload data
        dispatch(SetUploadDownloadProgress.action({ progress: 0, statusMessage: 'uploading file', timeRemainingMsg: 'tbd', indeterminate: true}));
        await UploadFileService(dispatch, fileId, fileData);
    
        dispatch(SetUploadDownloadProgress.action({ progress: 1, statusMessage: 'file upload successful', timeRemainingMsg: 'done', indeterminate: false}));
    } catch (err) {
        // Display failure
        dispatch(SetUploadDownloadProgress.action({ progress: 1, statusMessage: 'file download failed', timeRemainingMsg: 'done', indeterminate: false}));
    }
}
