import { UploadFileService } from "../../../../src/Services/Device";
import {
  fileId,
  localEncrpytionComponent,
  fileDownloadMsg,
  clone,
  location,
} from "../../../../__mocks__/mock-data";

// Mock request handler and config
jest.mock("../../../../src/Config");
jest.mock("../../../../src/Services/Device/Communication/BasicRequestHandler");
import BasicRequestHandler from "../../../../src/Services/Device/Communication/BasicRequestHandler";
import { Config } from "../../../../src/Config";

let testDispatch = jest.fn();

describe("UploadFileService unit tests", () => {
  beforeEach(() => {
    // cleaning up the mess left behind the previous test
    testDispatch = jest.fn();
  });

  it("uploads file successfully, updating upload progress", async () => {
    let requestNum = 1;
    BasicRequestHandler.mockImplementation(async (message) => {
      expect(JSON.stringify(message)).toStrictEqual(
        JSON.stringify({
          type: 3,
          fileId: fileId,
          packetNumber: requestNum,
          totalPackets: Number(clone(fileDownloadMsg).totalPackets),
          location: location,
          fileData: Buffer(fileDownloadMsg.fileData, "base64").toString(),
        })
      );

      requestNum++;

      return {
        localEncryptionComponent: "12345",
        status: 1,
      };
    });

    await UploadFileService(
      testDispatch,
      fileId,
      [
        Buffer(fileDownloadMsg.fileData, "base64"),
        Buffer(fileDownloadMsg.fileData, "base64"),
        Buffer(fileDownloadMsg.fileData, "base64"),
      ],
      location
    );

    expect(requestNum).toBe(Number(fileDownloadMsg.totalPackets) + 1);

    // Check that correct status messages were sent
    expect(testDispatch.mock.calls.length).toStrictEqual(
      Number(fileDownloadMsg.totalPackets) + 1
    );
    expect(testDispatch.mock.calls[requestNum - 1][0]).toStrictEqual({
      payload: {
        fileId: fileId,
        value: localEncrpytionComponent,
      },
      type: "fileTransfer/addEncryptionComponent",
    });
  });

  it("does not catch normal error, passes it upwards", async () => {
    BasicRequestHandler.mockImplementation(async (message) => {
      throw "error occured";
    });

    try {
      await UploadFileService(
        testDispatch,
        fileId,
        [
          Buffer(fileDownloadMsg.fileData, "base64"),
          Buffer(fileDownloadMsg.fileData, "base64"),
          Buffer(fileDownloadMsg.fileData, "base64"),
        ],
        location
      );

      // Should have failed by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toStrictEqual("error occured");
    }

    // Check that only one status update message was sent
    expect(testDispatch.mock.calls.length).toStrictEqual(1);
  });

  it("retransmits packet if device returns status of 0, contiunes normally afterwards", async () => {
    let requestNum = 1;
    BasicRequestHandler.mockImplementation(async (message) => {
      if (requestNum === 1) {
        requestNum++;
        throw "Request with id 3 failed";
      }

      expect(JSON.stringify(message)).toStrictEqual(
        JSON.stringify({
          type: 3,
          fileId: fileId,
          packetNumber: requestNum - 1,
          totalPackets: Number(clone(fileDownloadMsg).totalPackets),
          location: location,
          fileData: Buffer(fileDownloadMsg.fileData, "base64").toString(),
        })
      );

      requestNum++;

      return {
        localEncryptionComponent: "12345",
        status: 1,
      };
    });

    await UploadFileService(
      testDispatch,
      fileId,
      [
        Buffer(fileDownloadMsg.fileData, "base64"),
        Buffer(fileDownloadMsg.fileData, "base64"),
        Buffer(fileDownloadMsg.fileData, "base64"),
      ],
      location
    );

    expect(requestNum).toBe(Number(fileDownloadMsg.totalPackets) + 2);

    // Check that correct status messages were sent
    expect(testDispatch.mock.calls.length).toStrictEqual(
      Number(fileDownloadMsg.totalPackets) + 2
    );
    expect(testDispatch.mock.calls[requestNum - 1][0]).toStrictEqual({
      payload: {
        fileId: fileId,
        value: localEncrpytionComponent,
      },
      type: "fileTransfer/addEncryptionComponent",
    });
  });

  it("throws error after reaching max retransmit attempts", async () => {
    let requestNum = 0;
    BasicRequestHandler.mockImplementation(async (message) => {
      requestNum++;
      expect(requestNum <= Config.device.maxTransmissionAttempts).toBe(true);
      throw "Request with id 3 failed";
    });

    try {
      await UploadFileService(
        testDispatch,
        fileId,
        [
          Buffer(fileDownloadMsg.fileData, "base64"),
          Buffer(fileDownloadMsg.fileData, "base64"),
          Buffer(fileDownloadMsg.fileData, "base64"),
        ],
        location
      );

      // Should have failed by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("Too many transmission attempts");
    }

    // Check that three update calls were made
    expect(testDispatch.mock.calls.length).toStrictEqual(3);
  });
});
