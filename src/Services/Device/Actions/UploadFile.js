import { Config } from '@/Config'
import BasicRequestHandler from '../Communication/BasicRequestHandler'
import { AddEncryptionComponent } from '@/Store/FileTransfer'

export default UploadFile = async (dispatch, fileId, fileDataBufferArray, userEmail) => {
    var totalPackets = fileDataBufferArray.length;

    var requestMessage = {
        "messageType": 3,
        "email": userEmail,
        "fileId": fileId,
        "totalPackets": totalPackets,
    };
    
    var curPacketNum = 1;
    var transmissionAttempts = 0;
    var localEncryptionComponent = undefined;

    // Send each of the packets of data
    while (curPacketNum <= totalPackets) {
        requestMessage.packetNumber = curPacketNum;
        requestMessage.fileData = fileDataBufferArray[curPacketNum - 1].toString();

        try {
            const responseData = await BasicRequestHandler(requestMessage);
            
            if (localEncryptionComponent === undefined)
                localEncryptionComponent = responseData.localEncryptionComponent;
            
            // Update transmission state
            curPacketNum++;
            if (transmissionAttempts !== 0)
                transmissionAttempts = 0;
        } catch (err) {
            // Check if the device rejected the transmission. Retry if so
            if (err.contains('Request with id')) {
                transmissionAttempts++;

                // Prevent continuous reattempts
                if (transmissionAttempts === Config.device.maxTransmissionAttempts) {
                    throw 'Too many transmission attempts';
                }
            }

            // Otherwise send the error upwards
            throw err;
        } 
    }

    // Store the localEncryptionComponent
    dispatch(AddEncryptionComponent.action({ fileId: fileId, value: localEncryptionComponent }));
}