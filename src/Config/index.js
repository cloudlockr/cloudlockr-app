export const Config = {
  mocking: {
    apiConnection: false,
    deviceConnection: false,
  },

  api: {
    url: "https://cloudlockr.herokuapp.com/",
  },

  device: {
    expectedBluetoothName: "HC-05", // Expected discoverable device name
    connectionTimeout: 120, // TODO: UPDATE            // Max # of seconds to wait for response data
    refreshRate: 3, // # of seconds to wait between response polling
    maxBlobSizeBytes: 20000, // TODO: UPDATE            // Max expected size of file data in message (must be lower than device message buffer as it does not account for other message data)
    maxTransmissionAttempts: 3, // Max # of times the phone will reattempt transmission to device if error
  },
};
