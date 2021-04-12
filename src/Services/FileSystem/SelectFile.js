import DocumentPicker from "react-native-document-picker";

export default async () => {
  // Pick a single file
  try {
    return await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker
      return undefined;
    } else {
      throw err;
    }
  }
};
