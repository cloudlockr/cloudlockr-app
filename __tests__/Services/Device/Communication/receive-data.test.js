import ReceiveData from "../../../../src/Services/Device/Communication/ReceiveData";
import {
  bluetoothDevice,
  charMessage,
  charMessageBroken,
  charMessageJson,
  clone,
} from "../../../../__mocks__/mock-data";

jest.mock("../../../../src/Config");
jest.mock("../../../../src/Services/Device/Communication/SendData");
import { SendFragment } from "../../../../src/Services/Device/Communication/SendData";
import { Config } from "@/Config";

describe("ReceiveData unit tests", () => {
  beforeAll(() => {
    SendFragment.mockImplementation(async (device, message) => {
      expect(message).toStrictEqual(
        '{"status":2}' + Config.device.fragment.endOfAllFragments
      );
    });

    jest.useRealTimers();
  });

  it("successfully receives single fragment message char-by-char and constructs JSON object", async () => {
    let device = clone(bluetoothDevice);
    let curIdx = -1;
    device.read = async () => {
      curIdx++;
      return charMessage[curIdx];
    };

    let result = await ReceiveData(device, false);

    expect(curIdx).toBe(charMessage.length - 1);
    expect(result).toStrictEqual(charMessageJson);
  });

  it("successfully receives multi-fragment message char-by-char and constructs JSON object", async () => {
    let device = clone(bluetoothDevice);
    let curIdx = 0;
    let curFragment = 0;
    device.read = async () => {
      let curValue = charMessageBroken[curFragment][curIdx];

      curIdx++;
      if (curIdx >= charMessageBroken[curFragment].length) {
        curFragment++;
        curIdx = 0;
      }

      return curValue;
    };

    device.available = async () => {
      return charMessageBroken[curFragment].length;
    };

    let result = await ReceiveData(device, true);

    expect(curFragment).toBe(2);
    expect(curIdx).toBe(0);
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
        "Device connection timeout. Waited too long for fragment."
      );
    }
  });
});
