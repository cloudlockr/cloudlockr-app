import SetUploadDownloadProgress from "@/Store/FileTransfer/SetUploadDownloadProgress";
import { ProcessSaveFileService } from "@/Services/FileSystem";
import { DownloadFileService } from "@/Services/Device";
import { GetLocationService } from "@/Services/External";

export default async (dispatch, fileId, fileName, localEncryptionComponent) => {
  try {
    // Check if the local encryption component exists
    if (localEncryptionComponent === undefined) {
      throw "Error: Data uploaded on different device";
    }

    // Get the user's current location
    const location = await GetLocationService();

    // Download file from DE1
    dispatch(
      SetUploadDownloadProgress.action({
        progress: 0,
        statusMessage: "Requesting file download",
        timeRemainingMsg: "tbd",
        indeterminate: true,
      })
    );
    const fileBlob = await DownloadFileService(
      dispatch,
      fileId,
      localEncryptionComponent,
      location
    );

    // Process file data and save to device
    dispatch(
      SetUploadDownloadProgress.action({
        progress: 0.95,
        statusMessage: "Processing and saving file",
        timeRemainingMsg: "almost done",
        indeterminate: false,
      })
    );
    await ProcessSaveFileService(fileBlob, fileName);

    // Display the download complete message
    dispatch(
      SetUploadDownloadProgress.action({
        progress: 1,
        statusMessage: "File download successful",
        timeRemainingMsg: "done",
        indeterminate: false,
      })
    );
  } catch (err) {
    // Display failure
    dispatch(
      SetUploadDownloadProgress.action({
        progress: 1,
        statusMessage: "File download failed. " + err,
        timeRemainingMsg: "failed",
        indeterminate: false,
      })
    );
  }
};
