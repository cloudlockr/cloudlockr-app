import SetUploadDownloadProgress from '@/Store/FileTransfer/SetUploadDownloadProgress'

export default async (dispatch, fileId, fileData) => {
    // TODO: Need to implement properly and remove the below stub code
    
    for (var i = 0; i < 10; i++) {
        dispatch(SetUploadDownloadProgress.action({ progress: i/10, statusMessage: 'uploading to server via device', timeRemainingMsg: (10 - i) + ' sec', indeterminate: false}));
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return '';
}
