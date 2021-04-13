const RNFS = require("react-native-fs");

export default async (fileBlob, fileName) => {
  console.log(fileBlob);

  await RNFS.writeFile(
    RNFS.DownloadDirectoryPath + "/" + fileName,
    fileBlob.toString(),
    "base64"
  );
};
