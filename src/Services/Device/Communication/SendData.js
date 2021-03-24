// Takes a JSON object and transmits it to the specified bluetooth device
export default SendData = async (bluetoothDevice, messageObject) => {
    try {
        const sendData = JSON.stringify(messageObject) + '\r';
        await bluetoothDevice.write(sendData);
    } catch (err) {
        return [false, err.toString()];
    }
}
