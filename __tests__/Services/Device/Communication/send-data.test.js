import SendData from "../../../../src/Services/Device/Communication/SendData";
import {
  bluetoothDevice,
  fileDownloadMsg,
  fileDownloadMsgString,
  clone,
} from "../../../../__mocks__/mock-data";

jest.mock("../../../../src/Config");

describe("SendData unit tests", () => {
  it("successfully sends data with expected message formatting", async () => {
    let device = clone(bluetoothDevice);
    device.write = (data) => {
      expect(data).toStrictEqual(fileDownloadMsgString);
    };

    await SendData(device, fileDownloadMsg);
  });

  it("catches errors and transmits the string upwards", async () => {
    let device = clone(bluetoothDevice);
    device.write = (data) => {
      throw "configuration error";
    };

    try {
      await SendData(device, fileDownloadMsg);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("configuration error");
    }
  });
});
