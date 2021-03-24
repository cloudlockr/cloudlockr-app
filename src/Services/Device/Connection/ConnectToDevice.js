import CheckBonded from "./CheckBonded"
import { Config } from '@/Config'

// Connect to the device. Returns true if successful, false otherwise.
export default async () => {
    // Mock data (if selected)
    if (Config.mocking.deviceConnection) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return undefined;
    }

    // Check that the device is current bonded
    var bondedDevice;
    try {
        bondedDevice = await CheckBonded();
    } catch (err) {
        throw err;
    }

    // Try connecting to the device
    try {
        return await bondedDevice.connect();
    } catch (err) {
        throw err.toString();
    }
}
