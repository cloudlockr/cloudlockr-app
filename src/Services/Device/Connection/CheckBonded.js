import RNBluetoothClassic from 'react-native-bluetooth-classic'
import { Config } from '@/Config'

export default async () => {
    // Mock data (if selected)
    if (Config.MOCK_EXTERNAL_CONNECTIONS)
        return [true, ''];

    // Get the currently bonded devices (devices not yet technically "connected" yet)
    try {
        var bonded = await RNBluetoothClassic.getBondedDevices();
    } catch (error) {
        return [false, error.toString()];
    }

    // Check if the device is found as a bonded device
    for (let i = 0; i < bonded.length; i++) {
        if (bonded[i].name === Config.DEVICE_BLUETOOTH_NAME) {
            return [true, bonded[i]];
        }
    }

    return [false, ''];
}
