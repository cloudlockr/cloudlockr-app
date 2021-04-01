export const Config = {
  mocking: {
    apiConnection: false,
    deviceConnection: true,
  },

  api: {
    url: 'https://cloudlockr.herokuapp.com/'
  },

  device: {
    expectedBluetoothName: 'DE1_DEVICE',                      // Expected discoverable device name
    connectionTimeout: 120,        // TODO: UPDATE            // Max # of seconds to wait for response data
    refreshRate: 3,                                           // # of seconds to wait between response polling
    maxBlobSizeBytes: 5120,        // TODO: UPDATE            // Max expected size of file data in message (must be lower than device message buffer as it does not account for other message data)
    maxTransmissionAttempts: 3                                // Max # of times the phone will reattempt transmission to device if error
  },
}
