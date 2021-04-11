import { CheckBondedService } from "../../../../src/Services/Device";
import {
  bondedDevices,
  bondedDevicesNoDE1,
} from "../../../../__mocks__/mock-data";

// Mock called functions
jest.mock("../../../../src/Config");
jest.mock("react-native-bluetooth-classic");
import RNBluetoothClassic from "react-native-bluetooth-classic";

describe("CheckBondedService unit tests", () => {
  it("gets bonded devices successfully and phone is bonded", async () => {
    RNBluetoothClassic.getBondedDevices.mockImplementation(async () => {
      return bondedDevices;
    });

    await CheckBondedService();
  });

  it("gets bonded devices successfully and phone is not bonded", async () => {
    RNBluetoothClassic.getBondedDevices.mockImplementation(async () => {
      return bondedDevicesNoDE1;
    });

    try {
      await CheckBondedService();

      // Should have failed by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toStrictEqual(
        "Cannot connect to device as it is not connected to the phone. Please connect in the phone's Bluetooth settings."
      );
    }
  });

  it("passes error upwards", async () => {
    RNBluetoothClassic.getBondedDevices.mockImplementation(async () => {
      throw "error occured";
    });

    try {
      await CheckBondedService();

      // Should have failed by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toStrictEqual("error occured");
    }
  });
});
