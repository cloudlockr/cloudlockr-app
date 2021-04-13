export const Config = {
  mocking: {
    apiConnection: false,
    deviceConnection: false,
  },

  api: {
    url: "https://cloudlockr.herokuapp.com/",
  },

  device: {
    fragment: {
      dataLength: 2048,
      endOfFragment: "\r\n",
      endOfAllFragments: "\v\n",
    },
    maxConnectionAttempts: 3,
    expectedBluetoothName: "hc01.com HC-05", // Expected discoverable device name
    connectionTimeout: 60, // Max # of seconds to wait for response data
    refreshRate: 0.5, // # of seconds to wait between response polling
    maxBlobSizeBytes: 512, // Max expected size of file data in message (must be lower than device message buffer as it does not account for other message data)
    maxTransmissionAttempts: 3, // Max # of times the phone will reattempt transmission to device if error
  },
};
