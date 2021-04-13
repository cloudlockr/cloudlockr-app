import React, { useState } from "react";
import { Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { InputField, Button } from "@/Components";
import SetDetails from "@/Store/FileTransfer/SetDetails";
import { useTheme } from "@/Theme";

const DownloadDetail = (props) => {
  const { Layout, Fonts, Gutters, Colors } = useTheme();
  const dispatch = useDispatch();

  const requestCallback = props.requestCallback;

  var downloadInfo = useSelector((state) => state.fileTransfer).details;
  var encryptionComponents = useSelector((state) => state.fileTransfer)
    .encryptionComponents;

  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [buttonsEnabled, setButtonsEnabled] = useState(false);

  const passwordCallback = (returnedPassword) => {
    setPassword(returnedPassword);
    if (accessCode !== "") setButtonsEnabled(true);
  };

  const accessCodeCallback = (returnedCode) => {
    setAccessCode(returnedCode);
    if (password !== "") setButtonsEnabled(true);
  };

  const downloadCallback = () => {
    // Save the updated file details so that the localEncryptionComponent is stored
    if (encryptionComponents !== undefined) {
      var infoWithEncryptionComponent = {
        fileName: downloadInfo.fileName,
        id: downloadInfo.id,
        uploadDate: downloadInfo.uploadDate,
        localEncryptionComponent: encryptionComponents[downloadInfo.id],
      };
      dispatch(SetDetails.action(infoWithEncryptionComponent));
    }

    requestCallback("download", accessCode, password, downloadInfo.id);
  };

  const deleteCallback = () => {
    requestCallback("delete", accessCode, password, downloadInfo.id);
  };

  return (
    <View
      style={[Layout.column, Layout.alignItemsCenter, Gutters.largexlHPadding]}
    >
      <Text style={[Fonts.detailFileName, Gutters.regularxlVPadding]}>
        Access {downloadInfo.fileName}
      </Text>
      <View
        style={[
          Layout.column,
          Layout.alignItemsCenter,
          Layout.justifyContentBetween,
          { height: 190 },
        ]}
      >
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
            title={"Download"}
            color={Colors.secondary}
            style={[Gutters.regularRPadding, { flex: 2 }]}
            setEnabled={buttonsEnabled}
            clickCallback={downloadCallback}
          />
          <Button
            title={"Delete"}
            color={Colors.red}
            style={{ flex: 1 }}
            setEnabled={buttonsEnabled}
            clickCallback={deleteCallback}
          />
        </View>
      </View>
    </View>
  );
};

export default DownloadDetail;
