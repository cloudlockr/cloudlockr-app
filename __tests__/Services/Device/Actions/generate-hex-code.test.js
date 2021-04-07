import { GenerateHexCodeService } from "../../../../src/Services/Device";

// Mock send and recieve data functions
jest.mock("../../../../src/Services/Device/Communication/BasicRequestHandler");
import BasicRequestHandler from "../../../../src/Services/Device/Communication/BasicRequestHandler";

describe("GenerateHexCodeService unit tests", () => {
  let expectedRequest = {
    type: 1,
  };

  it("successfully makes request", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      expect(request).toStrictEqual(expectedRequest);
    });

    await GenerateHexCodeService();
  });

  it("does not catch error, passes it upwards", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      throw "configuration error";
    });

    try {
      await GenerateHexCodeService();

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("configuration error");
    }
  });
});
