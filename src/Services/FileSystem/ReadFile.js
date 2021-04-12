import { Config } from "@/Config";

const RNFS = require("react-native-fs");

export default async (fileUri) => {
  // Obtain the data from the file system (in ascii)
  var strBlob = await RNFS.readFile(fileUri, "ascii");

  if (strBlob.length === 0) throw "File contains no data.";

  var fullBlob = Buffer(strBlob);

  // Split the data into a bunch of buffers according to max message size
  var numSplits = Math.ceil(
    Buffer.byteLength(strBlob) / Config.device.maxBlobSizeBytes
  );
  var splitBlobs = [];

  for (var i = 0; i < numSplits; i++) {
    var startIdx = i * Config.device.maxBlobSizeBytes;
    var endIdx = (i + 1) * Config.device.maxBlobSizeBytes;

    if (i + 1 == numSplits) {
      splitBlobs.push(fullBlob.slice(startIdx));
    } else {
      splitBlobs.push(fullBlob.slice(startIdx, endIdx));
    }
  }

  return splitBlobs;
};
