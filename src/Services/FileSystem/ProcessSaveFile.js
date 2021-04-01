const RNFS = require("react-native-fs");

export default async (fileBlob, fileName) => {
  await RNFS.writeFile(
    RNFS.DownloadDirectoryPath + "/" + fileName,
    fileBlob.toString()
  );
};
