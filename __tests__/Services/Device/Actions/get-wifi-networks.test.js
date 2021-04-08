import { GetWifiNetworksService } from "../../../../src/Services/Device";

// Mock send and recieve data functions
jest.mock("../../../../src/Services/Device/Communication/BasicRequestHandler");
import BasicRequestHandler from "../../../../src/Services/Device/Communication/BasicRequestHandler";

describe("GetWifiNetworksService unit tests", () => {
  let expectedRequest = {
    type: 5,
  };

  it("successfully makes request and returns transformed data", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      expect(request).toStrictEqual(expectedRequest);

      return {
        networks: ["test", "test2"],
      };
    });

    let response = await GetWifiNetworksService();

    expect(response).toStrictEqual([{ name: "test" }, { name: "test2" }]);
  });

  it("does not catch error, passes it upwards", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      throw "configuration error";
    });

    try {
      await GetWifiNetworksService();

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("configuration error");
    }
  });

  it("throws error if response is missing networks field", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      return {};
    });

    try {
      await GetWifiNetworksService();

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe(
        "Received response from device, but was missing the expected networks field"
      );
    }
  });
});
