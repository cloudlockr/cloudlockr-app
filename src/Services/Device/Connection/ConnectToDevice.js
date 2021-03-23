import CheckBonded from "./CheckBonded"

// Connect to the device. Returns true if successful, false otherwise.
export default async () => {
    // Check that the device is current bonded
    var checkBonded = CheckBonded();
    if (!checkBonded[0]) {
        return [false, 'Cannot connect to device as it is not connected to phone. Please connect device to phone via the phone\'s Bluetooth settings.'];
    }

    var bondedDevice = checkBonded[1];

    // Try connecting to the device
    return await bondedDevice.connect();
}
