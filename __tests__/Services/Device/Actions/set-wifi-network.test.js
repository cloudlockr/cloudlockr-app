import { SetWifiNetworkService } from "../../../../src/Services/Device";

// Mock send and receive data functions
jest.mock("../../../../src/Services/Device/Communication/BasicRequestHandler");
import BasicRequestHandler from "../../../../src/Services/Device/Communication/BasicRequestHandler";

describe("SetWifiNetworkService unit tests", () => {
  let networkName = "networkName";
  let networkPassword = "networkPassword";

  let expectedRequest = {
    type: 6,
    networkName: networkName,
    networkPassword: networkPassword,
  };

  it("successfully makes request", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      expect(JSON.stringify(request)).toStrictEqual(
        JSON.stringify(expectedRequest)
      );
    });

    await SetWifiNetworkService(networkName, networkPassword);
  });

  it("does not catch error, passes it upwards", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      throw "configuration error";
    });

    try {
      await SetWifiNetworkService(networkName, networkPassword);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("configuration error");
    }
  });
});
