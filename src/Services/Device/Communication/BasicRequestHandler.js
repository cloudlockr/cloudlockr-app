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

  if (
    response === undefined ||
    response.status === undefined ||
    !response.status
  ) {
    throw (
      "Request with id " +
      requestMessage.messageType +
      " recieved by device, but failed."
    );
  }

  return response;
};
