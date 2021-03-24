import CheckBonded from "./CheckBonded"
import { Config } from '@/Config'

// Connect to the device. Returns true if successful, false otherwise.
export default async () => {
    // Mock data (if selected)
    if (Config.mocking.deviceConnection) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return [true, ''];
    }

    // Check that the device is current bonded
    var checkBonded = CheckBonded();
    if (!checkBonded[0]) {
        return [false, 'Cannot connect to device as it is not connected to phone. Please connect device to phone via the phone\'s Bluetooth settings.'];
    }

    var bondedDevice = checkBonded[1];

    // Try connecting to the device
    try {
        var connectResult = await bondedDevice.connect();
    } catch (err) {
        return [false, err.toString()];
    }
    
    return [connectResult, ''];
}
