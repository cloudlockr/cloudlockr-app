import { SendData } from "./SendData";
import ReceiveData from "./ReceiveData";
import ConnectToDevice from "../Connection/ConnectToDevice";

export default BasicRequestHandler = async (
  requestMessage,
  shouldAck = false
) => {
  const device = await ConnectToDevice();

  await SendData(device, requestMessage);

  const response = await ReceiveData(device, shouldAck);

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
          " recieved by device, but failed."
        );
    }
  }

  return response;
};
