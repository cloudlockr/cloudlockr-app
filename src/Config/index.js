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
    connectionTimeout: 120,                                   // Max # of seconds to wait for response data  // TODO: UPDATE
    refreshRate: 3,                                           // # of seconds to wait between response polling
    maxBlobSize: undefined,                                   // Max expected size of file blob data // TODO: UPDATE
    maxTransmissionAttempts: 3                                // Max # of times the phone will reattempt transmission to device if error
  },
}
