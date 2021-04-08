import React, { useState } from "react";
import { Text, View, Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import SetDetails from "@/Store/FileTransfer/SetDetails";
import { InputField, Button } from "@/Components";
import { useTheme } from "@/Theme";
import { SelectFileService } from "@/Services/FileSystem";

const UploadDetail = (props) => {
  const { Layout, Fonts, Gutters, Colors } = useTheme();
  const dispatch = useDispatch();

  const [fileName, setFileName] = useState("");
  const [fileMetadata, setFileMetadata] = useState({});
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const [fileSelectorTitle, setFileSelectorTitle] = useState("Select file");

  const requestCallback = props.requestCallback;

  const fileNameCallback = (returnedName) => {
    setFileName(returnedName);
    if (fileMetadata.uri !== undefined && password !== "" && accessCode !== "")
      setButtonEnabled(true);
  };

  const fileSelectorCallback = async () => {
    // Close the keyboard to ensure previous input fields are saved
    Keyboard.dismiss();

    // Select a file from the file system
    var fileMetadata = await SelectFileService();

    // Update the UI if a file has been successfully selected
    if (fileMetadata !== undefined) {
      setFileSelectorTitle(fileMetadata.name);
      setFileMetadata(fileMetadata);

      if (fileName !== "" && password !== "" && accessCode !== "")
        setButtonEnabled(true);
    }
  };

  const passwordCallback = (returnedPassword) => {
    setPassword(returnedPassword);
    if (fileName !== "" && fileMetadata.uri !== undefined && accessCode !== "")
      setButtonEnabled(true);
  };

  const accessCodeCallback = (returnedCode) => {
    setAccessCode(returnedCode);
    if (fileName !== "" && fileMetadata.uri !== undefined && password !== "")
      setButtonEnabled(true);
  };

  const uploadCallback = () => {
    // Append file extention to fileName if not already user entered
    var extention = fileMetadata.name.substring(
      fileMetadata.name.lastIndexOf(".")
    );
    var fileNameExtentionIdx = fileName.lastIndexOf(extention);

    var fileNameWithExtention = fileName;
    if (
      fileNameExtentionIdx === -1 ||
      fileNameExtentionIdx !== fileName.length - extention.length
    ) {
      fileNameWithExtention += extention;
    }

    // Store the data and return
    dispatch(
      SetDetails.action({
        fileName: fileNameWithExtention,
        fileMetadata: fileMetadata,
      })
    );
    requestCallback("upload", accessCode, password, undefined);
  };

  return (
    <View
      style={[Layout.column, Layout.alignItemsCenter, Gutters.largexlHPadding]}
    >
      <Text style={[Fonts.detailFileName, Gutters.regularxlVPadding]}>
        Upload new file
      </Text>
      <View
        style={[
          Layout.column,
          Layout.alignItemsCenter,
          Layout.justifyContentBetween,
          { height: 320 },
        ]}
      >
        <InputField
          placeholder={"File name"}
          useLightInput
          finishEditingCallback={fileNameCallback}
        />
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <Button
            title={fileSelectorTitle}
            useInputFieldStyle
            style={Layout.fill}
            clickCallback={fileSelectorCallback}
          />
        </View>
        <InputField
          placeholder={"Device password"}
          hideInput
          useLightInput
          finishEditingCallback={passwordCallback}
        />
        <InputField
          placeholder={"Device access code"}
          useLightInput
          finishEditingCallback={accessCodeCallback}
        />
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <Button
            title={"Upload file"}
            color={Colors.secondary}
            style={Layout.fill}
            setEnabled={buttonEnabled}
            clickCallback={uploadCallback}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadDetail;
