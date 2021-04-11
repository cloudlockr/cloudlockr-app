export const {
  token,
  fileId,
  fileName,
  fileType,
  fileUri,
  phoneReadFileData1,
  phoneReadFileData2,
  serverFormattedFiles,
  phoneFormattedFiles,
  email,
  password,
  location,
  localEncrpytionComponent,
  fileDownloadMsg,
  fileDownloadMsgString,
  bluetoothDevice,
  charMessage,
  charMessageBroken,
  charMessageJson,
  allNetworks,
  allValidNetworks,
  bondedDevices,
  bondedDevicesNoDE1,
  bondedDevice,
} = {
  token: {
    tokenType: "1234",
    accessToken: "5678",
    refreshToken: "abcd",
  },
  fileId: 1,
  fileName: "test.png",
  fileType: "image/png",
  fileUri: "file:/test.png",
  phoneReadFileData1: "11112222",
  phoneReadFileData2: "1111222233",
  serverFormattedFiles: [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "secret1.pdf",
      createdAt: "2021-01-28T12:00:00.000Z",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "secret2.pdf",
      createdAt: "2021-01-28T12:00:00.000Z",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "secret3.pdf",
      createdAt: "2021-01-28T12:00:00.000Z",
    },
  ],
  phoneFormattedFiles: [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fileName: "secret1.pdf",
      uploadDate: "Jan 28, 2021",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fileName: "secret2.pdf",
      uploadDate: "Jan 28, 2021",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fileName: "secret3.pdf",
      uploadDate: "Jan 28, 2021",
    },
  ],
  email: "test@gmail.com",
  password: "password123",
  location: "37.422|-122.084|5.285",
  localEncrpytionComponent: "12345",
  fileDownloadMsg: {
    packetNumber: "1",
    totalPackets: "3",
    fileData: "1234567",
  },
  fileDownloadMsgString:
    '{"packetNumber":"1","totalPackets":"3","fileData":"1234567"}\r',
  bluetoothDevice: {
    write: (data) => {},
    read: () => "1",
    available: () => charMessage.length,
  },
  charMessage: ["{", '"', "t", '"', ":", '"', "1", '"', "}", "\v", "\n"],
  charMessageBroken: [
    ["{", '"', "t", "\r", "\n"],
    ['"', ":", '"', "1", '"', "}", "\v", "\n"],
  ],
  charMessageJson: { t: "1" },
  allNetworks: [
    {
      capabilities: "[WPA-PSK]",
      SSID: "valid1",
    },
    {
      capabilities: "[WPA2-PSK]",
      SSID: "valid2",
    },
    {
      capabilities: "[WPA2-PSK]",
      SSID: "valid2",
    },
    {
      capabilities: "[WPA-PSK]",
      SSID: "invalid-5g",
    },
    {
      capabilities: "[WPA-PSK]",
      SSID: "invalid-5G",
    },
    {
      capabilities: "[WEP]",
      SSID: "invalid-type",
    },
  ],
  allValidNetworks: [
    {
      capabilities: "[WPA-PSK]",
      SSID: "valid1",
    },
    {
      capabilities: "[WPA2-PSK]",
      SSID: "valid2",
    },
  ],
  bondedDevices: [
    { name: "device1" },
    { name: "device2" },
    { name: "DE1_DEVICE" },
  ],
  bondedDevicesNoDE1: [{ name: "device1" }, { name: "device2" }],
  bondedDevice: {
    name: "DE1_DEVICE",
    connect: jest.fn(() => true),
  },
};

export const clone = (value) => {
  return Object.assign({}, value);
};
