import { SetWifiNetworkService } from "../../../../src/Services/Device";

// Mock send and recieve data functions
jest.mock("../../../../src/Services/Device/Communication/BasicRequestHandler");
import BasicRequestHandler from "../../../../src/Services/Device/Communication/BasicRequestHandler";

describe("SetWifiNetworkService unit tests", () => {
  let networkName = "networkName";
  let networkPassword = "networkPassord";

  let expectedRequest = {
    type: 6,
    networkName: networkName,
    networkPassword: networkPassword,
  };

  it("successfully makes request", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      expect(request).toStrictEqual(expectedRequest);
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
