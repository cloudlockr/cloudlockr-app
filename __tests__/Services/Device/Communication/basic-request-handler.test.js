import BasicRequestHandler from "../../../../src/Services/Device/Communication/BasicRequestHandler";

// Mock send and recieve data functions
jest.mock("../../../../src/Services/Device/Communication/SendData");
jest.mock("../../../../src/Services/Device/Communication/ReceiveData");
jest.mock("../../../../src/Services/Device/Connection/ConnectToDevice");
import ConnectToDevice from "../../../../src/Services/Device/Connection/ConnectToDevice";
import ReceiveData from "../../../../src/Services/Device/Communication/ReceiveData";
import { SendData } from "../../../../src/Services/Device/Communication/SendData";

describe("BasicRequestHandler unit tests", () => {
  const requestMessage = { messageType: 1 };
  const fakeDeviceInfo = "fake device info";

  beforeAll(() => {
    ConnectToDevice.mockImplementation(async () => {
      return fakeDeviceInfo;
    });

    SendData.mockImplementation(async (device, message) => {
      expect(device).toBe(fakeDeviceInfo);
      expect(message).toStrictEqual(requestMessage);
      return;
    });
  });

  it("successfully makes request and receives response", async () => {
    ReceiveData.mockImplementation(async (device) => {
      expect(device).toBe(fakeDeviceInfo);
      return {
        status: 1,
      };
    });

    let response = await BasicRequestHandler(requestMessage);

    expect(response).toStrictEqual({ status: 1 });
  });

  it("successfully makes request and receives special fileData response", async () => {
    ReceiveData.mockImplementation(async (device) => {
      expect(device).toBe(fakeDeviceInfo);
      return {
        fileData: "this is file data",
      };
    });

    let response = await BasicRequestHandler(requestMessage);

    expect(response).toStrictEqual({ fileData: "this is file data" });
  });

  it("does not catch normal error, passes it upwards", async () => {
    ReceiveData.mockImplementation(() => {
      throw "configuration error";
    });

    try {
      await BasicRequestHandler(requestMessage);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("configuration error");
    }
  });

  it("throws error if response has status of 0", async () => {
    ReceiveData.mockImplementation(async () => {
      return {
        status: 0,
      };
    });

    try {
      await BasicRequestHandler(requestMessage);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("Request with id 1 received by device, but failed.");
    }
  });

  it("throws special error if response has status of 9", async () => {
    ReceiveData.mockImplementation(async () => {
      return {
        status: 9,
      };
    });

    try {
      await BasicRequestHandler(requestMessage);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("Password/wifi connection not set up yet.");
    }
  });

  it("throws error if missing status response field", async () => {
    ReceiveData.mockImplementation(async () => {
      return {};
    });

    try {
      await BasicRequestHandler(requestMessage);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("Received malformed response message from device");
    }
  });

  it("throws error if response is not received", async () => {
    ReceiveData.mockImplementation(() => {
      return;
    });

    try {
      await BasicRequestHandler(requestMessage);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("Received malformed response message from device");
    }
  });
});
