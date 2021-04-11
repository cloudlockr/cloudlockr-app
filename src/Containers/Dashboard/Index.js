import { useTheme } from "@/Theme";
import React, { useEffect, useRef, useState } from "react";
import { View, BackHandler, Alert } from "react-native";
import { DashboardHeader, FileList, ErrorAlert } from "@/Components";
import { DownloadDetail, UploadDetail } from "@/Modals";
import {
  GenerateHexCodeService,
  ValidateDeviceAccessService,
} from "@/Services/Device";
import { DeleteService } from "@/Services/FileTransfer";
import SetIntention from "@/Store/Intention/SetIntention";
import ResetUploadDownloadProgress from "@/Store/FileTransfer/ResetUploadDownloadProgress";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "@/Navigators/Root";
import RBSheet from "react-native-raw-bottom-sheet";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";

const DashboardContainer = () => {
  const { Common, Layout, Colors } = useTheme();
  const uploadRBSheet = useRef();
  const downloadRBSheet = useRef();
  const dispatch = useDispatch();

  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const token = useSelector((state) => state.user).token;
  const showDeviceWarning = useSelector((state) => state.intention).intention
    .showDeviceWarning;

  // Prevent user from going back to login view via back button press
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);

    // Remind the user about setting the device password if its their first time seeing it
    if (showDeviceWarning) {
      showDeviceWarningAlert();

      // Reset the reminder warning trigger
      dispatch(SetIntention.action({ id: "showDeviceWarning", value: false }));
    }

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", () => true);

      // Hide the toasts when the user navigates away from the view
      Toast.hide();
    };
  }, []);

  const showDeviceWarningAlert = (title = "Reminder") => {
    Alert.alert(
      title + ": Set Your Device Password & Wifi Network",
      "Your device password and wifi network must be set every time you power on your device after it has been powered off. If you do not set the password, any uploaded data will be unrecoverable and downloading any existing data will result in invalid files. Further, you cannot transmit data if your device is not connected to the internet.",
      [
        {
          text: "Okay",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const generateHexCode = async () => {
    setSpinnerMessage("generating hex code");
    setSpinnerVisible(true);
    await GenerateHexCodeService();
    setSpinnerVisible(false);
  };

  const downloadCallback = async () => {
    try {
      // Show the download popup and generate a HEX code
      await generateHexCode();
      downloadRBSheet.current.open();
    } catch (err) {
      setSpinnerVisible(false);
      downloadRBSheet.current.close();

      if (err === "Password/wifi connection not set up yet.") {
        showDeviceWarningAlert("Error");
        return;
      }

      showToast(false, err);
    }
  };

  const uploadCallback = async () => {
    try {
      // Show the upload popup and generate a HEX code
      await generateHexCode();
      uploadRBSheet.current.open();
    } catch (err) {
      setSpinnerVisible(false);
      uploadRBSheet.current.close();

      if (err === "Password/wifi connection not set up yet.") {
        showDeviceWarningAlert("Error");
        return;
      }

      showToast(false, err);
    }
  };

  const requestCallback = async (requestName, accessCode, password, fileId) => {
    try {
      // Confirm access code with device
      setSpinnerMessage("validating device access");
      setSpinnerVisible(true);
      await ValidateDeviceAccessService(accessCode, password);

      // Execute actual request
      if (requestName === "delete") {
        // Request the file to be deleted
        setSpinnerMessage("deleting file");
        const requestResult = await DeleteService(fileId, token, dispatch);

        downloadRBSheet.current.close();
        setSpinnerVisible(false);

        // Swap the value to force the file list to refresh
        setRefreshTrigger(!refreshTrigger);

        // Indicate the result via a toast
        showToast(true, requestResult);
      } else {
        // Record if it is an upload or download, and reset the progress (to it occurs before the view loads)
        dispatch(
          SetIntention.action({
            id: "UploadDownloadProgress_isDownloading",
            value: requestName === "download",
          })
        );
        dispatch(ResetUploadDownloadProgress.action());

        setSpinnerVisible(false);
        downloadRBSheet.current.close();
        uploadRBSheet.current.close();
        navigate("UploadDownloadProgress", {});
      }
    } catch (err) {
      // Show toast for any errors
      setSpinnerVisible(false);
      showToast(false, err);
    }
  };

  const showToast = (wasSuccessful, message) => {
    if (!wasSuccessful) {
      ErrorAlert("File transfer error", message);
      return;
    }

    Toast.show({
      text1: "Success",
      text2: message,
      type: "success",
      position: "top",
      visibilityTime: 5000,
    });
  };

  return (
    <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
      <Spinner
        visible={spinnerVisible}
        textContent={spinnerMessage}
        textStyle={{ color: Colors.white }}
      />
      <DashboardHeader uploadCallback={uploadCallback} />
      <FileList
        downloadCallback={downloadCallback}
        refreshTrigger={refreshTrigger}
      />

      <RBSheet
        ref={downloadRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={340}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
          container: {
            backgroundColor: Colors.secondaryGreen,
          },
          draggableIcon: {
            backgroundColor: Colors.primary,
          },
        }}
      >
        <DownloadDetail requestCallback={requestCallback} />
      </RBSheet>
      <RBSheet
        ref={uploadRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={470}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
          container: {
            backgroundColor: Colors.secondaryGreen,
          },
          draggableIcon: {
            backgroundColor: Colors.primary,
          },
        }}
      >
        <UploadDetail requestCallback={requestCallback} />
      </RBSheet>
    </View>
  );
};

export default DashboardContainer;
