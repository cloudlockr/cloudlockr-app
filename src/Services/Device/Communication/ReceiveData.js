import { Config } from '@/Config'

const readData = (bluetoothDevice) => {
    var data = []

    for (let i = 0; i < available; i++) {
        let readData = await bluetoothDevice.read();
        data = [readData, ...data];
    }

    // TODO: will likely have to do other processing on the data, espeically if we are recieving bytes as we expect normal text right now.
    return JSON.parse(data.join());
}

// Poll for data, timeout if waiting too long
export default RecieveData = async (bluetoothDevice) => {
    // Mock data (if selected)
    if (Config.mocking.deviceConnection) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return [true, { data: 'Fake "recieved" data'}];
    }

    var secElapsed = 0;

    try {
        while (secElapsed < Config.device.connectionTimeout) {
            // Check if data is available and read if so
            var available = await bluetoothDevice.available();

            if (available > 0) {
                return [true, readData(bluetoothDevice)];
            }

            // Wait before checking again to prevent unneeded busy looping
            await new Promise(resolve => setTimeout(resolve, Config.device.refreshRate * 1000));
            secElapsed += Config.device.refreshRate;
        }
    } catch (err) {
        return [false, err.toString()];
    }

    // If we reach here, then a timeout has occured
    return [false, 'Device connection timeout. Waited too long for device response message.'];
}
