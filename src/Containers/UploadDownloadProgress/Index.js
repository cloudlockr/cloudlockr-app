import { useTheme } from "@/Theme";
import React, { useState, useCallback } from "react";
import { View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-spinkit";
import { Button } from "@/Components";
import ProgressBar from "react-native-progress/Bar";
import { UploadService, DownloadService } from "@/Services/FileTransfer";
import { useFocusEffect } from "@react-navigation/native";
import { navigate } from "@/Navigators/Root";

const useForceUpdate = () => {
  const [, updateState] = useState();
  return useCallback(() => updateState({}), []);
};

const UploadDownloadProgressContainer = () => {
  const { Common, Layout, Colors, Gutters, Fonts, Images } = useTheme();
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();

  const isDownloading = useSelector((state) => state.intention).intention
    .UploadDownloadProgress_isDownloading;
  const transferInfo = useSelector((state) => state.fileTransfer).details;
  const user = useSelector((state) => state.user);

  const userEmail = user.email;
  const userToken = user.token;
  const fileName =
    transferInfo.fileName !== undefined ? transferInfo.fileName : undefined;
  const fileUri =
    transferInfo.fileMetadata !== undefined
      ? transferInfo.fileMetadata.uri
      : undefined;
  const fileId = transferInfo.id;
  const fileType =
    transferInfo.fileMetadata !== undefined
      ? transferInfo.fileMetadata.type
      : undefined;
  const fileLocalEncrpytionComponent =
    transferInfo.localEncrpytionComponent !== undefined
      ? transferInfo.localEncrpytionComponent
      : undefined;

  const doneCallback = () => {
    navigate("Dashboard", {});
  };

  //
  // Status checking
  //

  const status = useSelector((state) => state.fileTransfer).progress;

  const doneEnabled = status.progress === 1;
  var bgUpdater;

  const updateChecker = () => {
    // Obtain the current status by forcing DOM update to read Redux
    if (!doneEnabled) forceUpdate();
  };

  // Start upload / download process when view loads
  useFocusEffect(
    React.useCallback(() => {
      // Start background timer to async update status and progress
      bgUpdater = setInterval(updateChecker, 500);

      if (isDownloading) {
        // Start download process in the background
        DownloadService(
          dispatch,
          fileId,
          fileName,
          fileLocalEncrpytionComponent,
          userEmail
        );
      } else {
        // Start upload process in the background
        UploadService(
          dispatch,
          fileUri,
          fileName,
          fileType,
          userToken,
          userEmail
        );
      }

      return () => {
        // Clean up timer when changing views
        clearInterval(bgUpdater);
      };
    }, [])
  );

  return (
    <View
      style={[
        Layout.fill,
        Common.backgroundSecondaryGreen,
        Layout.column,
        Gutters.largexlHPadding,
        Gutters.largexxxlVPadding,
        Layout.justifyContentBetween,
      ]}
    >
      <View
        style={[
          Layout.column,
          Layout.alignItemsCenter,
          Layout.justifyContentBetween,
          { height: 250 },
        ]}
      >
        {!doneEnabled ? (
          <Spinner
            isVisible
            size={150}
            type={"Bounce"}
            color={Colors.primary}
          />
        ) : (
          <Image
            source={Images.checkIcon}
            style={{ height: 150, width: 150 }}
          />
        )}
        <View
          style={[
            Layout.column,
            Layout.alignItemsCenter,
            Gutters.regularxlTPadding,
          ]}
        >
          <Text
            style={[
              Fonts.titleExtraDarkWhite,
              Fonts.textCenter,
              Gutters.tinyBPadding,
            ]}
          >
            {isDownloading ? "Downloading" : "Uploading"} {fileName}
          </Text>
          <Text style={[Fonts.smallerDetailLessBoldWhite, Fonts.textCenter]}>
            {status.statusMessage}
          </Text>
        </View>
      </View>
      <View
        style={[
          Layout.column,
          Layout.alignItemsCenter,
          Layout.justifyContentBetween,
          { height: 60 },
        ]}
      >
        <ProgressBar
          indeterminate={status.indeterminate}
          progress={status.progress}
          color={Colors.secondary}
          unfilledColor={Colors.primary}
          width={300}
          height={25}
          borderRadius={8}
          useNativeDriver
        />
        <Text style={Fonts.smallerDetailLessBoldWhite}>
          est. time remaining: {status.timeRemainingMsg}
        </Text>
      </View>
      <View
        style={[
          Layout.column,
          Layout.alignItemsCenter,
          Layout.justifyContentBetween,
          { height: 50 },
        ]}
      >
        <Button
          title={"Contiune"}
          clickCallback={doneCallback}
          setEnabled={doneEnabled}
          useLightStyle
          style={Layout.fill}
        />
      </View>
    </View>
  );
};

export default UploadDownloadProgressContainer;
