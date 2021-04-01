import { ReadFileService } from "../../../src/Services/FileSystem";
import {
  phoneReadFileData1,
  phoneReadFileData2,
  fileUri,
} from "../../../__mocks__/mock-data";

jest.mock("../../../src/Config");
jest.mock("react-native-fs", () => {
  return {
    readFile: jest.fn(),
  };
});
const RNFS = require("react-native-fs");

describe("ReadFileService unit tests", () => {
  it("successfully reads in file and splits according to maxBlobSizeBytes", async () => {
    RNFS.readFile.mockImplementation(async (passedFileUri) => {
      expect(passedFileUri).toBe(fileUri);

      return phoneReadFileData1;
    });

    let result = await ReadFileService(fileUri);

    // Expect the file data to be broken into two parts as the test config specifies a max size of 4 bytes per blob
    expect(result).toStrictEqual([
      Buffer(phoneReadFileData1.slice(0, 4)),
      Buffer(phoneReadFileData1.slice(4)),
    ]);
  });

  it("rounds up on splits to ensure all data is accounted for", async () => {
    RNFS.readFile.mockImplementation(async (passedFileUri) => {
      expect(passedFileUri).toBe(fileUri);

      return phoneReadFileData2;
    });

    let result = await ReadFileService(fileUri);

    // Expect the file data to be broken into three parts as the test config specifies a max size of 4 bytes per blob
    expect(result).toStrictEqual([
      Buffer(phoneReadFileData2.slice(0, 4)),
      Buffer(phoneReadFileData2.slice(4, 8)),
      Buffer(phoneReadFileData2.slice(8)),
    ]);
  });

  it("throws error if file has no data", async () => {
    RNFS.readFile.mockImplementation(async (passedFileUri) => {
      expect(passedFileUri).toBe(fileUri);

      return "";
    });

    try {
      await ReadFileService(fileUri);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("File contains no data.");
    }
  });

  it("passes errors upwards", async () => {
    RNFS.readFile.mockImplementation(async (passedFileUri) => {
      throw "invalid uri";
    });

    try {
      await ReadFileService(fileUri);

      // Should fail by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("invalid uri");
    }
  });
});
