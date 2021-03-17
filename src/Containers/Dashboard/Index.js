import { useTheme } from '@/Theme'
import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Alert,
    BackHandler
} from 'react-native'
import { DashboardHeader, FileList } from '@/Components'
import { DownloadDetail, UploadDetail } from '@/Modals'
import { GenerateHexCodeService, ValidateDeviceAccessService } from '@/Services/Device'
import { DeleteUserFileService } from '@/Services/Server'
import SetIntention from '@/Store/Intention/SetIntention'
import ResetUploadDownloadProgress from '@/Store/UploadDownloadProgress/ResetUploadDownloadProgress'
import { useDispatch } from 'react-redux'
import { navigate } from '@/Navigators/Root'
import RBSheet from 'react-native-raw-bottom-sheet'
import Spinner from 'react-native-loading-spinner-overlay'

const DashboardContainer = () => {
    const { Common, Layout, Colors } = useTheme();
    const uploadRBSheet = useRef();
    const downloadRBSheet = useRef();
    const dispatch = useDispatch();

    const [spinnerVisible, setSpinnerVisible] = useState(false);
    const [spinnerMessage, setSpinnerMessage] = useState('');

    // Prevent user from going back to login view via back button press
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true);
    }, []);

    // Update callback function
    const downloadCallback = () => {
        // Request a new HEX code to be generated
        GenerateHexCodeService();

        // Show the download popup
        downloadRBSheet.current.open();
    }
    
    const uploadCallback = () => {
        // Request a new HEX code to be generated
        GenerateHexCodeService();

        // Show the upload popup
        uploadRBSheet.current.open();
    }

    const requestCallback = async (requestName, accessCode, password, fileId) => {
        // Confirm access code with device
        setSpinnerMessage('validating access');
        setSpinnerVisible(true);
        const requestResult = await ValidateDeviceAccessService(accessCode, password);
        if (!requestResult[0]) {
            // Show alert if there is an error validating the code
            setSpinnerVisible(false);
            requestAlert(requestAlert[0], requestAlert[1]);
            return;
        }

        // Execute request
        if (requestName === 'delete') {
            // Request the file to be deleted
            setSpinnerMessage('deleting file');
            const requestResult = await DeleteUserFileService(fileId);
            
            downloadRBSheet.current.close();
            setSpinnerVisible(false);

            // Show the result
            requestAlert(requestResult[0], requestResult[1]);
        } else {
            // Record if it is an upload or download, and reset the progress (to it occurs before the view loads)
            dispatch(SetIntention.action({ id: "UploadDownloadProgress_isDownloading", value: (requestName === 'download') }));
            dispatch(ResetUploadDownloadProgress.action());

            setSpinnerVisible(false);
            downloadRBSheet.current.close();
            uploadRBSheet.current.close();
            navigate('UploadDownloadProgress', {});
        }
    }

    const requestAlert = (wasSuccessful, message) => {
        Alert.alert(
            wasSuccessful ? "Success" : "Error Occured While Updating",
            wasSuccessful ? message : message + ". Please try again later and/or resolve the error.",
            [
                {
                text: "Okay",
                style: "cancel"
                }
            ],
            { cancelable: true }
        );
    }

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <Spinner visible={spinnerVisible} textContent={spinnerMessage} textStyle={{color: Colors.white}} />
            <DashboardHeader uploadCallback={uploadCallback} />
            <FileList downloadCallback={downloadCallback} />

            <RBSheet
                ref={downloadRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={340}
                customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
                container: {
                    backgroundColor: Colors.secondaryGreen,
                },
                draggableIcon: {
                    backgroundColor: Colors.primary,
                }
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
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
                container: {
                    backgroundColor: Colors.secondaryGreen,
                },
                draggableIcon: {
                    backgroundColor: Colors.primary,
                }
                }}
            >
                <UploadDetail requestCallback={requestCallback} />
            </RBSheet>
        </View>
    )
}

export default DashboardContainer;
