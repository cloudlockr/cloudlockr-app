import { Config } from "@/Config";

// Fake data that covers all possible response message fields
// TODO: could make this more advanced, giving proper responses to given inputs
const fakeData = {
  status: 1,

  localEncryptionComponent: "qwefgasdasip",

  packetNumber: 1,
  totalPackets: 10,
  fileData: "asdasdasjkdhnaskjdnas",

  networks: ["network1", "NETwork2", "netWORK8"],
};

const readData = async (bluetoothDevice, available) => {
  var data = [];

  for (let i = 0; i < available; i++) {
    data.push(await bluetoothDevice.read());
  }

  // TODO: will likely have to do other processing on the data, espeically if we are recieving bytes as we expect normal text right now.
  //       may also be in BASE-64 right now, so that may need to be parsed too. Have to see when we have real data to test with.
  return JSON.parse(data.join(""));
};

const checkForData = async (bluetoothDevice, secElapsed) => {
  try {
    // Check if data is available and read if so
    var available = await bluetoothDevice.available();

    if (available > 0) {
      return await readData(bluetoothDevice, available);
    }

    // Timeout if applicable
    if (
      secElapsed + Config.device.refreshRate >=
      Config.device.connectionTimeout
    )
      throw "Device connection timeout. Waited too long for device response message.";

    // Wait before checking again to prevent unneeded busy looping
    setTimeout(
      () =>
        checkForData(bluetoothDevice, secElapsed + Config.device.refreshRate),
      Config.device.refreshRate * 1000
    );
  } catch (err) {
    throw err.toString();
  }
};

// Poll for data, timeout if waiting too long
export default RecieveData = async (bluetoothDevice) => {
  // Mock data (if selected)
  if (Config.mocking.deviceConnection) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return fakeData;
  }

  return checkForData(bluetoothDevice, 0);
};
