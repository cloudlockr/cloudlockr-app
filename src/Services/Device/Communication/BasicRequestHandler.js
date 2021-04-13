import { SendData } from "./SendData";
import ReceiveData from "./ReceiveData";
import ConnectToDevice from "../Connection/ConnectToDevice";

export default BasicRequestHandler = async (
  requestMessage,
  shouldAck = false
) => {
  const device = await ConnectToDevice();

  console.log("request: " + JSON.stringify(requestMessage));

  await SendData(device, requestMessage);

  const response = await ReceiveData(device, shouldAck);

  console.log("response: " + JSON.stringify(response) + "\n");

  // Let the special file data response pass
  if (response !== undefined && response.fileData !== undefined)
    return response;

  // Check for response status code errors
  if (response === undefined || response.status === undefined) {
    throw "Received malformed response message from device";
  } else if (response.status !== 1) {
    switch (response.status) {
      case 9:
        throw "Password/wifi connection not set up yet.";
      default:
        throw (
          "Request with id " +
          requestMessage.messageType +
          " received by device, but failed."
        );
    }
  }

  return response;
};
