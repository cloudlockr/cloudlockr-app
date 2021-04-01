import { ValidateDeviceAccessService } from "../../../../src/Services/Device";

// Mock send and recieve data functions
jest.mock("../../../../src/Services/Device/Communication/BasicRequestHandler");
import BasicRequestHandler from "../../../../src/Services/Device/Communication/BasicRequestHandler";

describe("ValidateDeviceAccessService unit tests", () => {
  let devicePassword = "devicePassword";
  let hexCode = "hexCode";

  let expectedRequest = {
    messageType: 2,
    password: devicePassword,
    hex: hexCode,
  };

  it("successfully makes request", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      expect(request).toStrictEqual(expectedRequest);
    });

    await ValidateDeviceAccessService(hexCode, devicePassword);
  });

  it("does not catch error, passes it upwards", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      throw "configuration error";
    });

    try {
      await ValidateDeviceAccessService(hexCode, devicePassword);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("configuration error");
    }
  });
});
