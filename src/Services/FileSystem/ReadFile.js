
export default async (fileUri) => {
    // TODO: see the documetation here: https://www.npmjs.com/package/react-native-document-picker and look into react-fs library
    // Make sure to return the file as an array of buffers broken up into the message size (which should be specified in the Config)

    await new Promise(resolve => setTimeout(resolve, 500));

    return [Buffer('test1'), Buffer('test2')];
}
