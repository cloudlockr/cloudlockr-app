import { Config } from "@/Config";
import { SendFragment } from "@/Services/Device/Communication/SendData";

// Mock data that covers all possible response message fields
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

  return data.join("");
};

const receiveFragment = async (bluetoothDevice, shouldAck) => {
  var secElapsed = 0;

  try {
    while (secElapsed < Config.device.connectionTimeout) {
      // Check if data is available and read if so
      var available = await bluetoothDevice.available();

      if (available > 0) {
        var data = await readData(bluetoothDevice, available);

        // Send fragment confirmation to DE1 and return data
        if (shouldAck)
          await SendFragment(
            bluetoothDevice,
            '{"status":2}' + Config.device.fragment.endOfAllFragments
          );

        return data;
      }

      // Wait before checking again to prevent unneeded busy looping
      await new Promise((resolve) =>
        setTimeout(resolve, Config.device.refreshRate * 1000)
      );
      secElapsed += Config.device.refreshRate;
    }
  } catch (err) {
    throw err.toString();
  }

  throw "Device connection timeout. Waited too long for fragment.";
};

// Poll for data, timeout if waiting too long
export default RecieveData = async (bluetoothDevice, shouldAck = false) => {
  // Mock data (if selected)
  if (Config.mocking.deviceConnection) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return fakeData;
  }

  var fragments = [];

  // Collect all of the reponse fragments
  while (true) {
    var newFragment = await receiveFragment(bluetoothDevice, shouldAck);
    fragments.push(newFragment.slice(0, newFragment.length - 2));

    var fragmentEnding = newFragment.slice(-2);
    if (
      fragmentEnding !== Config.device.fragment.endOfFragment &&
      fragmentEnding !== Config.device.fragment.endOfAllFragments
    )
      throw "Device Error. Invalid fragment formatting.";

    if (fragmentEnding === Config.device.fragment.endOfAllFragments) break;
  }

  console.log(JSON.stringify(fragments));

  // Return the reassambled JSON object
  return JSON.parse(fragments.join(""));
};
