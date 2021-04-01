import ReceiveData from "../../../../src/Services/Device/Communication/ReceiveData";
import {
  bluetoothDevice,
  charMessage,
  charMessageJson,
  clone,
} from "../../../../__mocks__/mock-data";

jest.mock("../../../../src/Config");

describe("ReceiveData unit tests", () => {
  it("successfully recieves data char-by-char and constructs JSON object", async () => {
    let device = clone(bluetoothDevice);
    let curIdx = -1;
    device.read = async () => {
      curIdx++;
      return charMessage[curIdx];
    };

    let result = await ReceiveData(device);

    expect(curIdx).toBe(charMessage.length - 1);
    expect(result).toStrictEqual(charMessageJson);
  });

  it("catches errors and transmits the string upwards", async () => {
    let device = clone(bluetoothDevice);
    device.read = async () => {
      throw "configuration error";
    };

    try {
      await ReceiveData(device);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("configuration error");
    }
  });

  it("throws error on timeout", async () => {
    let device = clone(bluetoothDevice);
    device.available = async () => 0;

    try {
      await ReceiveData(device);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe(
        "Device connection timeout. Waited too long for device response message."
      );
    }
  });
});
