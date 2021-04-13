import { Config } from "@/Config";
import ReceiveData from "@/Services/Device/Communication/ReceiveData";

const waitForAck = async (bluetoothDevice) => {
  const ack = await ReceiveData(bluetoothDevice, false);
  return ack.status !== undefined && ack.status === 2;
};

const createFragments = (inputString) => {
  var fragments = [];
  var startIdx = 0;
  var endIdx = 0;
  for (; endIdx < inputString.length; endIdx++) {
    if (endIdx - startIdx === Config.device.fragment.dataLength) {
      fragments.push(
        inputString.slice(startIdx, endIdx) +
          Config.device.fragment.endOfFragment
      );
      startIdx = endIdx;
    }
  }

  // Handle end of message conditions
  if (endIdx !== startIdx) {
    fragments.push(
      inputString.slice(startIdx, endIdx) +
        Config.device.fragment.endOfAllFragments
    );
  } else {
    fragments[fragments.length - 1] =
      fragments[fragments.length - 1].substr(0, fragments.length - 2) +
      Config.device.fragment.endOfAllFragments;
  }

  return fragments;
};

// Sends a single fragment to the bluetooth device (no formatting included)
export const SendFragment = async (bluetoothDevice, fragment) => {
  try {
    await bluetoothDevice.write(fragment);
  } catch (err) {
    throw err.toString();
  }
};

// Takes a JSON object and transmits it to the specified bluetooth device
export const SendData = async (bluetoothDevice, messageObject) => {
  // Mock data (if selected)
  if (Config.mocking.deviceConnection) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return;
  }

  // Split up the data into fragments
  fragments = createFragments(JSON.stringify(messageObject));

  // Send each of the fragments, waiting for each acknowledgement
  var fNum = 0;
  var attempts = 0;
  while (fNum < fragments.length) {
    await SendFragment(bluetoothDevice, fragments[fNum]);
    var wasSuccessful = await waitForAck(bluetoothDevice);

    if (wasSuccessful) {
      // Increment to sending the next fragment
      fNum++;
      attempts = 0;
    } else {
      // Retry sending fragment if attempts are less than the max
      if (attempts === Config.device.maxTransmissionAttempts)
        throw "Device connection timeout. Failed to send fragment.";

      attempts++;
    }
  }
};
