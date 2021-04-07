import { SetPasswordService } from "../../../../src/Services/Device";

// Mock send and recieve data functions
jest.mock("../../../../src/Services/Device/Communication/BasicRequestHandler");
jest.mock("../../../../src/Services/Device/Actions/ValidateDeviceAccess");
import BasicRequestHandler from "../../../../src/Services/Device/Communication/BasicRequestHandler";
import ValidateDeviceAccess from "../../../../src/Services/Device/Actions/ValidateDeviceAccess";

describe("SetPasswordService unit tests", () => {
  let newPassword = "newPassword";
  let accessCode = "accessCode";
  let currentPassword = "currentPassword";

  let expectedRequest = {
    type: 7,
    password: newPassword,
  };

  it("successfully makes request", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      expect(request).toStrictEqual(expectedRequest);
    });
    ValidateDeviceAccess.mockImplementation(
      async (passedAccessCode, passedCurrentPassword) => {
        expect(passedAccessCode).toBe(accessCode);
        expect(passedCurrentPassword).toBe(currentPassword);
      }
    );

    await SetPasswordService(currentPassword, newPassword, accessCode);
  });

  it("does not catch error, passes it upwards", async () => {
    BasicRequestHandler.mockImplementation(async (request) => {
      throw "configuration error";
    });
    ValidateDeviceAccess.mockImplementation(() => {
      return;
    });

    try {
      await SetPasswordService(currentPassword, newPassword, accessCode);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("configuration error");
    }
  });
});
