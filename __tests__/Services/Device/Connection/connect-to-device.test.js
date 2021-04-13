import ConnectToDevice from "../../../../src/Services/Device/Connection/ConnectToDevice";
import { bondedDevice, clone } from "../../../../__mocks__/mock-data";

// Mock called functions
jest.mock("../../../../src/Config");
jest.mock("../../../../src/Services/Device/Connection/CheckBonded");
import CheckBonded from "../../../../src/Services/Device/Connection/CheckBonded";

describe("CheckBondedService unit tests", () => {
  beforeAll(() => {
    jest.useRealTimers();
  });

  it("connects to device successfully", async () => {
    CheckBonded.mockImplementation(async () => {
      return bondedDevice;
    });

    var returnedDevice = await ConnectToDevice();

    expect(returnedDevice).toStrictEqual(bondedDevice);
  });

  it("device is bonded, but fails to connect to device", async () => {
    CheckBonded.mockImplementation(async () => {
      var retDevice = clone(bondedDevice);
      retDevice.connect = jest.fn(() => false);
      return retDevice;
    });

    try {
      await ConnectToDevice();

      // Should have failed by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toStrictEqual("Could not connect to device");
    }
  });

  it("passes error upwards", async () => {
    CheckBonded.mockImplementation(async () => {
      throw "error occurred";
    });

    try {
      await ConnectToDevice();

      // Should have failed by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toStrictEqual("error occurred");
    }
  });

  it("throws error if max connection attempts reached", async () => {
    CheckBonded.mockImplementation(async () => {
      var retDevice = clone(bondedDevice);
      retDevice.connect = jest.fn(() => {
        throw "timeout error";
      });
      return retDevice;
    });

    try {
      await ConnectToDevice();

      // Should have failed by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toStrictEqual("Max connection attempts reached");
    }
  });
});
