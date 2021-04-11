import CheckBonded from "./CheckBonded";
import { Config } from "@/Config";

// Connect to the device. Returns true if successful, false otherwise.
export default async () => {
  // Mock data (if selected)
  if (Config.mocking.deviceConnection) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return undefined;
  }

  var attempts = 1;
  while (1) {
    // Check that the device is current bonded
    var bondedDevice;
    try {
      bondedDevice = await CheckBonded();
    } catch (err) {
      throw err;
    }

    // Try connecting to the device
    var connected;
    try {
      connected = await bondedDevice.connect();
      break;
    } catch (err) {
      // do nothing with the error
    }

    if (attempts > Config.device.maxConnectionAttempts)
      throw "Max connection attempts reached";

    // Wait before attempting again
    await new Promise((resolve) => setTimeout(resolve, 500));
    attempts++;
  }

  if (connected) return bondedDevice;
  else throw "Could not connect to device";
};
