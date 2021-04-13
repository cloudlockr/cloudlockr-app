import { GetWifiNetworksService } from "../../../src/Services/External";
import { allNetworks, allValidNetworks } from "../../../__mocks__/mock-data";

// Mock the location API
jest.mock("react-native-wifi-reborn");
import WifiManager from "react-native-wifi-reborn";

describe("GetLocationSGetWifiNetworksServiceervice unit tests", () => {
  it("gets wifi networks without duplicates, excludes 5G and non WPA/WPA2", async () => {
    WifiManager.loadWifiList.mockImplementation(async () => {
      return allNetworks;
    });

    var response = await GetWifiNetworksService();

    expect(response).toStrictEqual(allValidNetworks);
  });

  it("passes error upwards", async () => {
    WifiManager.loadWifiList.mockImplementation(async () => {
      throw "error occurred";
    });

    try {
      await GetWifiNetworksService();

      // Should have failed by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toStrictEqual("error occurred");
    }
  });
});
