import { SetPasswordService } from "../../../../src/Services/Device";

// Mock send and recieve data functions
jest.mock("../../../../src/Services/Device/Communication/BasicRequestHandler");
import BasicRequestHandler from "../../../../src/Services/Device/Communication/BasicRequestHandler";

describe("SetPasswordService unit tests", () => {
  let newPassword = "newPassword";

  let expectedRequest = {
    type: 7,
    password: newPassword,
  };

  it("successfully makes request", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      expect(JSON.stringify(request)).toStrictEqual(
        JSON.stringify(expectedRequest)
      );
    });

    await SetPasswordService(newPassword);
  });

  it("does not catch error, passes it upwards", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      throw "configuration error";
    });

    try {
      await SetPasswordService(newPassword);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("configuration error");
    }
  });
});
