import SetUploadDownloadProgress from "@/Store/FileTransfer/SetUploadDownloadProgress";
import { PostNewFileService, DeleteUserFileService } from "@/Services/Server";
import { ReadFileService } from "@/Services/FileSystem";
import { UploadFileService } from "@/Services/Device";
import { GetLocationSerivce } from "@/Services/External";

export default async (
  dispatch,
  fileUri,
  fileName,
  fileType,
  token,
  userEmail
) => {
  var fileId = undefined;

  try {
    // Get the user's current location
    const location = await GetLocationSerivce();

    // Obtain file from filesystem
    dispatch(
      SetUploadDownloadProgress.action({
        progress: 0,
        statusMessage: "Obtaining file data",
        timeRemainingMsg: "tbd",
        indeterminate: true,
      })
    );
    const fileDataBlobArray = await ReadFileService(fileUri);

    // Create new file entry in database
    dispatch(
      SetUploadDownloadProgress.action({
        progress: 0,
        statusMessage: "Contacting servers",
        timeRemainingMsg: "tbd",
        indeterminate: true,
      })
    );
    fileId = await PostNewFileService(dispatch, token, fileName, fileType);

    // Send request to DE1 to upload data
    dispatch(
      SetUploadDownloadProgress.action({
        progress: 0,
        statusMessage: "Uploading file",
        timeRemainingMsg: "tbd",
        indeterminate: true,
      })
    );
    await UploadFileService(
      dispatch,
      fileId,
      fileDataBlobArray,
      userEmail,
      location
    );

    dispatch(
      SetUploadDownloadProgress.action({
        progress: 1,
        statusMessage: "File upload successful",
        timeRemainingMsg: "done",
        indeterminate: false,
      })
    );
  } catch (err) {
    // Display failure
    dispatch(
      SetUploadDownloadProgress.action({
        progress: 1,
        statusMessage: "File upload failed. " + err,
        timeRemainingMsg: "failed",
        indeterminate: false,
      })
    );

    // Remove file if it has been created in the db
    if (fileId !== undefined) {
      DeleteUserFileService(dispatch, token, fileId);
    }
  }
};
