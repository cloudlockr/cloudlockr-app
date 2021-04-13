import { Config } from "@/Config";
import SetUploadDownloadProgress from "@/Store/FileTransfer/SetUploadDownloadProgress";
import BasicRequestHandler from "../Communication/BasicRequestHandler";

var packetsReceived;
var totalPackets;

const mockReceivedData = (data) => {
  data.packetNumber = packetsReceived + 1;
  data.totalPackets = 5;

  return data;
};

export default DownloadFile = async (
  dispatch,
  fileId,
  localEncryptionComponent,
  location
) => {
  packetsReceived = 0;
  totalPackets = 0;

  var requestMessage = {
    type: 4,
    localEncryptionComponent: localEncryptionComponent,
    fileId: fileId,
    location: location,
  };

  var fileBlobs = [];

  // Gather all of the file blobs
  while (
    totalPackets !== packetsReceived ||
    (packetsReceived === 0 && totalPackets === 0)
  ) {
    dispatch(
      SetUploadDownloadProgress.action({
        progress: packetsReceived === 0 ? 0 : packetsReceived / totalPackets,
        statusMessage: "downloading from server via device",
        timeRemainingMsg: "unknown",
        indeterminate: packetsReceived === -1,
      })
    );

    var receivedData = await BasicRequestHandler(requestMessage, false);
    if (Config.mocking.deviceConnection)
      receivedData = mockReceivedData(receivedData);

    fileBlobs.push(Buffer(receivedData.fileData, "ascii"));

    packetsReceived = receivedData.packetNumber;
    totalPackets = receivedData.totalPackets;
    requestMessage = { status: 1 };
  }

  // Return one large concatenated buffer
  return Buffer.concat(fileBlobs);
};
