import { DownloadFileService } from "../../../../src/Services/Device";
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

let testDispatch = jest.fn();

describe("DownloadFileService unit tests", () => {
  beforeEach(() => {
    // cleaning up the mess left behind the previous test
    testDispatch = jest.fn();
  });

  it("downloads file successfully, updating download progress", async () => {
    let requestNum = 1;
    BasicRequestHandler.mockImplementation(async (message) => {
      if (requestNum === 1) {
        expect(JSON.stringify(message)).toStrictEqual(
          JSON.stringify({
            type: 4,
            localEncryptionComponent: localEncrpytionComponent,
            fileId: fileId,
            location: location,
          })
        );
      } else {
        expect(message).toStrictEqual({ status: 1 });
      }

      let retData = clone(fileDownloadMsg);
      retData.packetNumber = requestNum.toString();
      requestNum++;

      return retData;
    });

    let result = await DownloadFileService(
      testDispatch,
      fileId,
      localEncrpytionComponent,
      location
    );

    expect(requestNum).toBe(Number(fileDownloadMsg.totalPackets) + 1);

    let b1 = Buffer(fileDownloadMsg.fileData, "base64");
    let b2 = Buffer(fileDownloadMsg.fileData, "base64");
    let b3 = Buffer(fileDownloadMsg.fileData, "base64");
    let expected = Buffer.concat([b1, b2, b3]);

    expect(result).toStrictEqual(expected);

    // Check that correct status messages were sent
    expect(testDispatch.mock.calls.length).toStrictEqual(
      Number(fileDownloadMsg.totalPackets)
    );
  });

  it("does not catch error, passes it upwards", async () => {
    BasicRequestHandler.mockImplementation(async (message) => {
      throw "error occured";
    });

    try {
      await DownloadFileService(
        testDispatch,
        fileId,
        localEncrpytionComponent,
        location
      );

      // Should have failed by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toStrictEqual("error occured");
    }

    // Check that only one message was sent
    expect(testDispatch.mock.calls.length).toStrictEqual(1);
  });
});
