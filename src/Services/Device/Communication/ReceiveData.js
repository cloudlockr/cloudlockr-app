import { Config } from '@/Config'

// Fake data that covers all possible response message fields
// TODO: could make this more advanced, giving proper responses to given inputs
const fakeData = {
    status: 1,

    localEncryptionComponent: 'qwefgasdasip',
    
    packetNumber: 1,
    totalPackets: 10,
    fileData: 'asdasdasjkdhnaskjdnas',

    networks: ['network1', 'NETwork2', 'netWORK8'],
}

const readData = async (bluetoothDevice) => {
    var data = []

    for (let i = 0; i < available; i++) {
        let readData = await bluetoothDevice.read();
        data = [readData, ...data];
    }

    // TODO: will likely have to do other processing on the data, espeically if we are recieving bytes as we expect normal text right now.
    //       may also be in BASE-64 right now, so that may need to be parsed too. Have to see when we have real data to test with.
    return JSON.parse(data.join());
}

// Poll for data, timeout if waiting too long
export default RecieveData = async (bluetoothDevice) => {
    // Mock data (if selected)
    if (Config.mocking.deviceConnection) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return fakeData;
    }

    var secElapsed = 0;

    try {
        while (secElapsed < Config.device.connectionTimeout) {
            // Check if data is available and read if so
            var available = await bluetoothDevice.available();

            if (available > 0) {
                return await readData(bluetoothDevice);
            }

            // Wait before checking again to prevent unneeded busy looping
            await new Promise(resolve => setTimeout(resolve, Config.device.refreshRate * 1000));
            secElapsed += Config.device.refreshRate;
        }
    } catch (err) {
        throw err.toString();
    }

    // If we reach here, then a timeout has occured
    throw 'Device connection timeout. Waited too long for device response message.';
}
