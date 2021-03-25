import { Config } from '@/Config'

// Takes a JSON object and transmits it to the specified bluetooth device
export default SendData = async (bluetoothDevice, messageObject) => {
    // Mock data (if selected)
    if (Config.mocking.deviceConnection) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return;
    }
    
    try {
        const sendData = JSON.stringify(messageObject) + '\r';
        await bluetoothDevice.write(sendData);
    } catch (err) {
        throw err.toString();
    }
}
