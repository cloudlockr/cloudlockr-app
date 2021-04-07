import { SendData } from "../../../../src/Services/Device/Communication/SendData";
import {
  bluetoothDevice,
  fileDownloadMsg,
  clone,
} from "../../../../__mocks__/mock-data";

jest.mock("../../../../src/Config");
jest.mock("../../../../src/Services/Device/Communication/ReceiveData");
import ReceiveData from "../../../../src/Services/Device/Communication/ReceiveData";
import { Config } from "@/Config";

describe("SendData unit tests", () => {
  it("successfully sends data with expected message fragmentation", async () => {
    let device = clone(bluetoothDevice);

    ReceiveData.mockImplementation(async (passedDevice) => {
      expect(passedDevice).toBe(device);
      return {
        status: 2,
      };
    });

    let sentData = [];
    device.write = (data) => {
      expect(data.length <= Config.device.fragment.dataLength + 2).toBe(true);
      sentData.push(data.substr(0, data.length - 2));
    };

    await SendData(device, fileDownloadMsg);

    // Check that the fragments were correctly sent
    expect(JSON.parse(sentData.join(""))).toStrictEqual(fileDownloadMsg);
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
