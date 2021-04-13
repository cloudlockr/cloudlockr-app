import { buildSlice } from "@thecodingmachine/redux-toolkit-wrapper";
import initialState from "@/Store/initialState";
import SetUploadDownloadProgress from "@/Store/FileTransfer/SetUploadDownloadProgress";
import ResetUploadDownloadProgress from "@/Store/FileTransfer/ResetUploadDownloadProgress";
import AddEncryptionComponent from "@/Store/FileTransfer/AddEncryptionComponent";
import RemoveEncryptionComponent from "@/Store/FileTransfer/RemoveEncryptionComponent";
import SetDetails from "@/Store/FileTransfer/SetDetails";

export default buildSlice(
  "fileTransfer",
  [
    SetDetails,
    SetUploadDownloadProgress,
    ResetUploadDownloadProgress,
    AddEncryptionComponent,
    RemoveEncryptionComponent,
  ],
  {
    details: initialState.fileTransfer.details,
    progress: initialState.fileTransfer.progress,
    encryptionComponents: {},
  }
).reducer;

export {
  SetUploadDownloadProgress,
  ResetUploadDownloadProgress,
  AddEncryptionComponent,
  RemoveEncryptionComponent,
};
